import React from 'react';
import { Mic, Play } from 'lucide-react';

const ModeSelector = ({ mode, onModeChange }) => {
    return (
        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
                onClick={() => onModeChange('voice')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'voice'
                        ? 'bg-gray-700 text-white shadow'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
            >
                <Mic size={14} /> 음성 인식
            </button>
            <button
                onClick={() => onModeChange('manual')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'manual'
                        ? 'bg-gray-700 text-white shadow'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
            >
                <Play size={14} /> 자동 스크롤
            </button>
        </div>
    );
};

export default ModeSelector;
