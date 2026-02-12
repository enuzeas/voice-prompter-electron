import React from 'react';
import { Scaling, MoveVertical, Type, Mic, FlipHorizontal } from 'lucide-react';
import AudioDeviceSelector from './AudioDeviceSelector';

const SettingsPanel = ({
    fontSize,
    onFontSizeChange,
    letterSpacing,
    onLetterSpacingChange,
    isSerif,
    onFontFamilyChange,
    selectedDeviceId,
    onDeviceChange,
    onStreamReady,
    isMirrored,
    onMirrorChange
}) => {
    return (
        <div className="px-6 py-4 bg-gray-800/50 backdrop-blur border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
            {/* Audio Device Selector */}
            <div className="md:col-span-3 pb-4 border-b border-gray-700 mb-2">
                <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase mb-2">
                    <span className="flex items-center gap-1">
                        <Mic size={12} /> 마이크 설정
                    </span>
                </div>
                <AudioDeviceSelector
                    selectedDeviceId={selectedDeviceId}
                    onDeviceChange={onDeviceChange}
                    onStreamReady={onStreamReady}
                />
            </div>

            {/* Font Size */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                    <span className="flex items-center gap-1">
                        <Scaling size={12} /> 글자 크기
                    </span>
                    <span>{fontSize}px</span>
                </div>
                <input
                    type="range"
                    min="20"
                    max="100"
                    step="2"
                    value={fontSize}
                    onChange={(e) => onFontSizeChange(Number(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Letter Spacing */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                    <span className="flex items-center gap-1">
                        <MoveVertical size={12} className="rotate-90" /> 자간
                    </span>
                    <span>{letterSpacing}px</span>
                </div>
                <input
                    type="range"
                    min="-2"
                    max="10"
                    step="0.5"
                    value={letterSpacing}
                    onChange={(e) => onLetterSpacingChange(Number(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Font Family */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                    <span className="flex items-center gap-1">
                        <Type size={12} /> 서체 스타일
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onFontFamilyChange(false)}
                        className={`flex-1 py-1.5 text-xs rounded border transition-colors ${!isSerif
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                            }`}
                    >
                        고딕 (Sans)
                    </button>
                    <button
                        onClick={() => onFontFamilyChange(true)}
                        className={`flex-1 py-1.5 text-xs rounded border transition-colors font-serif ${isSerif
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                            }`}
                    >
                        명조 (Serif)
                    </button>
                </div>
            </div>

            {/* Mirror Mode */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                    <span className="flex items-center gap-1">
                        <FlipHorizontal size={12} /> 좌우 반전
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onMirrorChange(false)}
                        className={`flex-1 py-1.5 text-xs rounded border transition-colors ${!isMirrored
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                            }`}
                    >
                        기본
                    </button>
                    <button
                        onClick={() => onMirrorChange(true)}
                        className={`flex-1 py-1.5 text-xs rounded border transition-colors ${isMirrored
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-400'
                            }`}
                    >
                        반전
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SettingsPanel;
