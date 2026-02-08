import React from 'react';
import { Settings, FileText, Cloud, Loader2, AlertCircle, Languages, Maximize2, MonitorPlay } from 'lucide-react';
import ModeSelector from './ModeSelector';
import ActionButtons from './ActionButtons';
import languages from '../../constants/languages';

const Header = ({
    mode,
    onModeChange,
    isListening,
    isPlaying,
    onToggleListening,
    onTogglePlay,
    onReset,
    manualSpeed,
    onSpeedChange,
    showSettings,
    onToggleSettings,
    showScriptEditor,
    onToggleScriptEditor,
    saveStatus,
    currentLanguage,
    onLanguageChange,
    onToggleFullscreen,
    onOpenPresentation,
    isPresentationMode
}) => {
    // Sync status indicator
    const SyncIndicator = () => {
        if (saveStatus === 'saving') {
            return (
                <div className="flex items-center gap-1 text-xs text-blue-400">
                    <Loader2 size={12} className="animate-spin" /> 저장 중...
                </div>
            );
        }
        if (saveStatus === 'saved') {
            return (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Cloud size={12} /> 저장됨
                </div>
            );
        }
        if (saveStatus === 'error') {
            return (
                <div className="flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} /> 저장 실패
                </div>
            );
        }
        return null;
    };

    const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

    return (
        <div className="flex flex-col z-30 bg-gray-900 border-b border-gray-800 shadow-xl relative">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold tracking-tight text-gray-200 hidden md:block">
                        Focus Prompter
                    </h1>

                    <ModeSelector mode={mode} onModeChange={onModeChange} />
                </div>

                {/* Sync Status */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1 md:top-auto">
                    <SyncIndicator />
                </div>

                <div className="flex gap-3 items-center">
                    <ActionButtons
                        mode={mode}
                        isListening={isListening}
                        isPlaying={isPlaying}
                        onToggleListening={onToggleListening}
                        onTogglePlay={onTogglePlay}
                        onReset={onReset}
                        manualSpeed={manualSpeed}
                        onSpeedChange={onSpeedChange}
                    />

                    {/* Presentation Mode Button */}
                    <button
                        onClick={onOpenPresentation}
                        className={`p-2 rounded-lg border border-gray-700 transition-colors ${isPresentationMode
                                ? 'bg-purple-600 text-white border-purple-500'
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        title="프리젠테이션 모드"
                    >
                        <MonitorPlay size={20} />
                    </button>

                    {/* Fullscreen Button */}
                    <button
                        onClick={onToggleFullscreen}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors"
                        title="전체화면"
                    >
                        <Maximize2 size={20} />
                    </button>

                    {/* Language Selector */}
                    <div className="relative group">
                        <button
                            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            title="언어 선택"
                        >
                            <span className="text-lg">{currentLang.flag}</span>
                            <Languages size={16} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => onLanguageChange(lang.code)}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 ${lang.code === currentLanguage ? 'bg-gray-700 text-white' : 'text-gray-300'
                                        } first:rounded-t-lg last:rounded-b-lg`}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="text-sm">{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onToggleScriptEditor}
                        className={`p-2 rounded-lg border border-gray-700 transition-colors ${showScriptEditor
                                ? 'bg-blue-600 text-white border-blue-500'
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        title="대본 편집"
                    >
                        <FileText size={20} />
                    </button>

                    <button
                        onClick={onToggleSettings}
                        className={`p-2 rounded-lg border border-gray-700 transition-colors ${showSettings
                                ? 'bg-blue-600 text-white border-blue-500'
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        title="설정"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
