import { useState, useEffect, useRef } from 'react';

const useAudioLevel = (deviceId, isEnabled) => {
    const [audioLevel, setAudioLevel] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!isEnabled || !deviceId) {
            console.log('Audio monitoring disabled or no deviceId:', { isEnabled, deviceId });
            cleanup();
            setAudioLevel(0);
            return;
        }

        const startMonitoring = async () => {
            console.log('Starting audio monitoring for device:', deviceId);
            try {
                if (streamRef.current) {
                    cleanup();
                }

                // Handle 'default' device explicitly
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

                console.log('Requesting user media with constraints:', constraints);
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('Stream acquired:', stream.id);

                streamRef.current = stream;

                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContextClass();

                if (audioContextRef.current.state === 'suspended') {
                    console.log('AudioContext suspended, attempting to resume...');
                    await audioContextRef.current.resume();
                }

                analyserRef.current = audioContextRef.current.createAnalyser();
                sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);

                sourceRef.current.connect(analyserRef.current);

                analyserRef.current.fftSize = 256;
                analyserRef.current.smoothingTimeConstant = 0.5; // Responsive but not too jittery

                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const updateLevel = () => {
                    if (!analyserRef.current) return;

                    analyserRef.current.getByteFrequencyData(dataArray);

                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / bufferLength;

                    // Normalize roughly to 0-100 range, amplifying lower volumes slightly
                    // Typical speech might be around 20-60 in raw average
                    const normalized = Math.min(100, Math.round((average / 128) * 100 * 1.5));

                    setAudioLevel(prev => {
                        // Smooth decay
                        if (normalized < prev) {
                            return Math.max(0, prev - 5);
                        }
                        return normalized;
                    });

                    animationFrameRef.current = requestAnimationFrame(updateLevel);
                };

                updateLevel();

            } catch (error) {
                console.error('Error accessing microphone:', error);
                setAudioLevel(0);
            }
        };

        startMonitoring();

        return () => {
            cleanup();
        };
    }, [deviceId, isEnabled]);

    const cleanup = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        analyserRef.current = null;
        sourceRef.current = null;
    };

    return audioLevel;
};

export default useAudioLevel;
