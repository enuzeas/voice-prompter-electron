import React from 'react';
import { Mic, MicOff, Play, Pause, RefreshCw } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

const ActionButtons = ({
    mode,
    isListening,
    isPlaying,
    onToggleListening,
    onTogglePlay,
    onReset,
    manualSpeed,
    onSpeedChange,
    currentLanguage
}) => {
    const { t } = useTranslation(currentLanguage);

    return (
        <div className="flex gap-3 items-center">
            {mode === 'voice' ? (
                <button
                    onClick={onToggleListening}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isListening
                        ? 'bg-red-500/10 text-red-500 border border-red-500'
                        : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'
                        }`}
                >
                    {isListening ? (
                        <>
                            <MicOff size={18} /> {t('actions.stopListening')}
                        </>
                    ) : (
                        <>
                            <Mic size={18} /> {t('actions.startListening')}
                        </>
                    )}
                </button>
            ) : (
                <div className="flex items-center gap-2">
                    {/* Speed Control */}
                    <div className="hidden md:flex items-center gap-2 mr-4 bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
                        <span className="text-xs text-gray-400 font-bold">{t('actions.speed')}</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={manualSpeed}
                            onChange={(e) => onSpeedChange(Number(e.target.value))}
                            className="w-24 accent-green-500 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-white w-4 text-center">{manualSpeed}</span>
                    </div>

                    <button
                        onClick={onTogglePlay}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isPlaying
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500'
                            : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'
                            }`}
                    >
                        {isPlaying ? (
                            <>
                                <Pause size={18} /> {t('actions.pause')}
                            </>
                        ) : (
                            <>
                                <Play size={18} /> {t('actions.play')}
                            </>
                        )}
                    </button>
                </div>
            )}

            <button
                onClick={onReset}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors"
                title={t('actions.reset')}
            >
                <RefreshCw size={20} />
            </button>
        </div>
    );
};

export default ActionButtons;
