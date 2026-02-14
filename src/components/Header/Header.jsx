import React from 'react';
import { Settings, FileText, Cloud, Loader2, AlertCircle, Languages, Maximize2, MonitorPlay } from 'lucide-react';
import ModeSelector from './ModeSelector';
import ActionButtons from './ActionButtons';
import languages from '../../constants/languages';
import useTranslation from '../../hooks/useTranslation';

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
    isPresentationMode,
    onOpenAbout
}) => {
    const { t } = useTranslation(currentLanguage);

    // Sync status indicator
    const SyncIndicator = () => {
        if (saveStatus === 'saving') {
            return (
                <div className="flex items-center gap-1 text-xs text-blue-400">
                    <Loader2 size={12} className="animate-spin" /> {t('header.saving')}
                </div>
            );
        }
        if (saveStatus === 'saved') {
            return (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Cloud size={12} /> {t('header.saved')}
                </div>
            );
        }
        if (saveStatus === 'error') {
            return (
                <div className="flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} /> {t('header.saveError')}
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
                    <h1
                        className="text-xl font-bold tracking-tight text-gray-200 hidden md:block cursor-pointer hover:text-white transition-colors"
                        onClick={onOpenAbout}
                        title={t('about.title')}
                    >
                        {t('header.title')}
                        <span className="ml-2 text-xs text-gray-500 font-normal">v0.0.7</span>
                    </h1>

                    <ModeSelector
                        mode={mode}
                        onModeChange={onModeChange}
                        currentLanguage={currentLanguage}
                    />
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
                        currentLanguage={currentLanguage}
                    />

                    {/* Presentation Mode Button */}
                    <button
                        onClick={onOpenPresentation}
                        className={`p-2 rounded-lg border border-gray-700 transition-colors ${isPresentationMode
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        title={t('header.presentationMode')}
                    >
                        <MonitorPlay size={20} />
                    </button>

                    {/* Fullscreen Button */}
                    <button
                        onClick={onToggleFullscreen}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors"
                        title={t('header.fullscreen')}
                    >
                        <Maximize2 size={20} />
                    </button>

                    {/* Language Selector */}
                    <div className="relative group">
                        <button
                            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            title={t('header.languageSelect')}
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
                        title={t('header.editScript')}
                    >
                        <FileText size={20} />
                    </button>

                    <button
                        onClick={onToggleSettings}
                        className={`p-2 rounded-lg border border-gray-700 transition-colors ${showSettings
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                            }`}
                        title={t('header.settings')}
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
