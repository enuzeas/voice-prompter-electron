import React from 'react';
import { Volume2 } from 'lucide-react';

/**
 * Audio Level Meter Component
 * Displays audio input level with visual indicator
 */
const AudioLevelMeter = ({ level }) => {
    const getVolumeColor = () => {
        if (level < 30) return 'bg-gray-700';
        if (level < 60) return 'bg-green-600';
        if (level < 80) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getVolumeLabel = () => {
        if (level < 30) return '신호 없음';
        if (level < 60) return '양호';
        if (level < 80) return '큼';
        return '너무 큼';
    };

    return (
        <div className="flex items-center gap-3">
            <Volume2 size={14} className="text-gray-400" />
            <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-100 ${getVolumeColor()}`}
                    style={{ width: `${level}%` }}
                ></div>
            </div>
            <span className="text-sm text-gray-400 font-bold w-12">{getVolumeLabel()}</span>
            <span className="text-xs text-gray-500 ml-1">{level}%</span>
        </div>
    );
};

export default AudioLevelMeter;
