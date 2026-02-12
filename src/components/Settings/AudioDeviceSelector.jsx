import React, { useState, useEffect } from 'react';
import audioDeviceService from '../../services/audioDevice.service';

/**
 * Audio Device Selector Component
 * Allows users to select microphone and see audio level
 */
const AudioDeviceSelector = ({ selectedDeviceId, onDeviceChange, onStreamReady }) => {
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);

    // Load available devices on mount
    useEffect(() => {
        loadDevices();
    }, []);

    // Start monitoring when device is selected
    useEffect(() => {
        if (selectedDeviceId && onStreamReady) {
            startMonitoring();
        }
    }, [selectedDeviceId]);

    const loadDevices = async () => {
        setIsLoading(true);
        setError('');

        try {
            const audioDevices = await audioDeviceService.getAudioDevices();
            setDevices(audioDevices);

            if (audioDevices.length === 0) {
                setError('마이크 장치를 찾을 수 없습니다.');
            }
        } catch (err) {
            setError(err.message || '장치 목록을 불러올 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const startMonitoring = async () => {
        try {
            setIsMonitoring(true);
            await audioDeviceService.startMonitoring(
                selectedDeviceId,
                (level) => {
                    setAudioLevel(level);
                }
            );

            // Get stream for speech recognition
            const stream = audioDeviceService.getCurrentStream();
            if (stream && onStreamReady) {
                onStreamReady(stream);
            }
        } catch (err) {
            console.error('Failed to start monitoring:', err);
            setError('오디오 모니터링을 시작할 수 없습니다.');
            setIsMonitoring(false);
        }
    };

    const handleDeviceChange = (deviceId) => {
        onDeviceChange(deviceId);
        setError('');
    };

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-3">

            {/* Error Message */}
            {error && (
                <div className="bg-red-900/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* Device List & Meter */}
            {!isLoading && devices.length > 0 && (
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <select
                            value={selectedDeviceId}
                            onChange={(e) => handleDeviceChange(e.target.value)}
                            className="w-full appearance-none bg-gray-700 text-white border border-gray-600 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {devices.map((device) => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Microphone ${device.deviceId}`}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    {/* Compact Audio Meter */}
                    <div className="w-24 flex items-center gap-2 bg-gray-900/50 px-2 py-1 rounded border border-gray-700 h-10" title="오디오 입력 레벨">
                        <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-100 ${audioLevel < 30 ? 'bg-gray-500' :
                                    audioLevel < 60 ? 'bg-green-500' :
                                        audioLevel < 80 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                style={{ width: `${audioLevel}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* No Devices Message */}
            {!isLoading && devices.length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                    <p>마이크를 찾을 수 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default AudioDeviceSelector;
