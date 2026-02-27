import { useEffect, useRef } from 'react';

const useAudioLevel = (deviceId, isEnabled, targetRef) => {
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null);
    const prevLevelRef = useRef(0);

    useEffect(() => {
        const cleanup = () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => { track.stop(); });
                streamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
            analyserRef.current = null;
            sourceRef.current = null;
            prevLevelRef.current = 0;
        };

        if (!isEnabled || !deviceId || deviceId === 'none' || !targetRef) {
            cleanup();
            if (targetRef?.current) {
                targetRef.current.style.setProperty('--audio-level', '0');
                targetRef.current.style.setProperty('--audio-scale', '1');
                targetRef.current.style.setProperty('--audio-opacity', '0.2');
            }
            return;
        }

        const startMonitoring = async () => {
            try {
                if (streamRef.current) {
                    cleanup();
                }

                const constraints = {
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                };

                if (deviceId !== 'default') {
                    constraints.audio.deviceId = { exact: deviceId };
                }

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                streamRef.current = stream;

                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContextClass();

                if (audioContextRef.current.state === 'suspended') {
                    await audioContextRef.current.resume();
                }

                analyserRef.current = audioContextRef.current.createAnalyser();
                sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);

                sourceRef.current.connect(analyserRef.current);

                analyserRef.current.fftSize = 256;
                analyserRef.current.smoothingTimeConstant = 0.5;

                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const updateLevel = () => {
                    if (!analyserRef.current || !targetRef.current) return;

                    analyserRef.current.getByteFrequencyData(dataArray);

                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / bufferLength;

                    const normalized = Math.min(100, Math.round((average / 128) * 100 * 1.5));

                    let currentLevel = normalized;
                    if (normalized < prevLevelRef.current) {
                        currentLevel = Math.max(0, prevLevelRef.current - 5);
                    }
                    prevLevelRef.current = currentLevel;

                    const target = targetRef.current;
                    target.style.setProperty('--audio-level', currentLevel.toString());
                    target.style.setProperty('--audio-scale', (1 + (currentLevel / 100) * 0.5).toFixed(2));
                    target.style.setProperty('--audio-opacity', Math.max(0.2, currentLevel / 100).toFixed(2));

                    animationFrameRef.current = requestAnimationFrame(updateLevel);
                };

                updateLevel();

            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        startMonitoring();

        return () => {
            cleanup();
        };
    }, [deviceId, isEnabled, targetRef]);
};

export default useAudioLevel;
