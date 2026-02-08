import React, { useState, useEffect } from 'react';
import { Mic, MicOff, RefreshCw } from 'lucide-react';
import audioDeviceService from '../../services/audioDevice.service';
import AudioLevelMeter from './AudioLevelMeter';

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
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <Mic size={20} className="text-blue-400" />
                    마이크 선택
                </h3>
                <button
                    onClick={loadDevices}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
                    title="장치 목록 새로고침"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

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

            {/* Device List */}
            {!isLoading && devices.length > 0 && (
                <div className="space-y-2">
                    {devices.map((device) => (
                        <button
                            key={device.deviceId}
                            onClick={() => handleDeviceChange(device.deviceId)}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                                selectedDeviceId === device.deviceId
                                    ? 'bg-blue-600 text-white border-blue-500'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                            } border`}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="truncate">{device.label}</span>
                                    {selectedDeviceId === device.deviceId && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs text-green-400">연결됨</span>
                                        </div>
                                    )}
                                </div>
                                {selectedDeviceId === device.deviceId && (
                                    <AudioLevelMeter level={audioLevel} />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No Devices Message */}
            {!isLoading && devices.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    <MicOff size={48} className="mx-auto mb-4 text-gray-600" />
                    <p>마이크 장치를 찾을 수 없습니다.</p>
                    <p className="text-sm mt-2">마이크를 연결하고 브라우저 권한을 허용해주세요.</p>
                </div>
            )}
        </div>
    );
};

export default AudioDeviceSelector;
