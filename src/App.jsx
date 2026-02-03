import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header/Header';
import SettingsPanel from './components/Settings/SettingsPanel';
import ScriptEditor from './components/ScriptEditor/ScriptEditor';
import PrompterDisplay from './components/Prompter/PrompterDisplay';
import useIndexedDB from './hooks/useIndexedDB';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import useAutoScroll from './hooks/useAutoScroll';
import { processScriptToWords } from './utils/wordProcessing';
import keyboardHandler from './utils/keyboardHandler';
import defaultScript from './constants/defaultScript';

const App = () => {
    // Mode and UI state
    const [mode, setMode] = useState('voice');
    const [showSettings, setShowSettings] = useState(false);
    const [showScriptEditor, setShowScriptEditor] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('ko-KR');

    // Refs
    const containerRef = useRef(null);

    // IndexedDB persistence
    const { config, updateConfig, saveStatus } = useIndexedDB({
        scriptText: defaultScript,
        fontSize: 48,
        letterSpacing: 0,
        isSerif: false,
        lineHeight: 1.6,
        manualSpeed: 3,
        language: 'ko-KR'
    });

    // Derived state from config
    const { scriptText, fontSize, letterSpacing, isSerif, lineHeight, manualSpeed } = config;

    // Process script to words
    const words = useMemo(() => processScriptToWords(scriptText), [scriptText]);

    // Speech recognition
    const {
        isListening,
        activeIndex,
        error: speechError,
        wordRefs,
        toggleListening,
        resetPosition: resetSpeechPosition,
        setLanguage: setSpeechLanguage
    } = useSpeechRecognition(words, currentLanguage);

    // Auto scroll
    const {
        isPlaying,
        togglePlay,
        reset: resetScroll
    } = useAutoScroll(containerRef, manualSpeed);

    // Update scroll speed when config changes
    useEffect(() => {
        // Speed updates are handled automatically by the hook
    }, [manualSpeed]);

    // Mode change handler
    const handleModeChange = (newMode) => {
        setMode(newMode);
        if (newMode === 'voice') {
            resetScroll();
        } else {
            if (isListening) {
                toggleListening();
            }
            resetSpeechPosition();
        }
    };

    // Reset handler
    const handleReset = () => {
        if (mode === 'voice') {
            resetSpeechPosition();
        } else {
            resetScroll();
        }
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    };

    // Script save handler
    const handleScriptSave = (newScript) => {
        updateConfig({ scriptText: newScript });
        setShowScriptEditor(false);
        handleReset();
    };

    // Language change handler
    const handleLanguageChange = (newLang) => {
        setCurrentLanguage(newLang);
        setSpeechLanguage(newLang);
        updateConfig({ language: newLang });
    };

    // Keyboard shortcuts
    useEffect(() => {
        keyboardHandler.register('RESET', handleReset);
        keyboardHandler.register('TOGGLE_PLAY', () => {
            if (mode === 'voice') {
                toggleListening();
            } else {
                togglePlay();
            }
        });
        keyboardHandler.register('OPEN_EDITOR', () => {
            setShowScriptEditor(prev => !prev);
            setShowSettings(false);
        });
        keyboardHandler.register('OPEN_SETTINGS', () => {
            setShowSettings(prev => !prev);
            setShowScriptEditor(false);
        });
        keyboardHandler.register('CLOSE_MODAL', () => {
            setShowSettings(false);
            setShowScriptEditor(false);
        });

        keyboardHandler.start();

        return () => {
            keyboardHandler.stop();
            keyboardHandler.clear();
        };
    }, [mode, toggleListening, togglePlay, handleReset]);

    return (
        <div className={`flex flex-col h-screen bg-black text-white`}>
            <Header
                mode={mode}
                onModeChange={handleModeChange}
                isListening={isListening}
                isPlaying={isPlaying}
                onToggleListening={toggleListening}
                onTogglePlay={togglePlay}
                onReset={handleReset}
                manualSpeed={manualSpeed}
                onSpeedChange={(speed) => updateConfig({ manualSpeed: speed })}
                showSettings={showSettings}
                onToggleSettings={() => {
                    setShowSettings(!showSettings);
                    setShowScriptEditor(false);
                }}
                showScriptEditor={showScriptEditor}
                onToggleScriptEditor={() => {
                    setShowScriptEditor(!showScriptEditor);
                    setShowSettings(false);
                }}
                saveStatus={saveStatus}
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
            />

            {/* Settings Panel */}
            {showSettings && (
                <SettingsPanel
                    fontSize={fontSize}
                    onFontSizeChange={(size) => updateConfig({ fontSize: size })}
                    letterSpacing={letterSpacing}
                    onLetterSpacingChange={(spacing) => updateConfig({ letterSpacing: spacing })}
                    isSerif={isSerif}
                    onFontFamilyChange={(serif) => updateConfig({ isSerif: serif })}
                />
            )}

            {/* Script Editor */}
            <ScriptEditor
                isOpen={showScriptEditor}
                scriptText={scriptText}
                onSave={handleScriptSave}
                onClose={() => setShowScriptEditor(false)}
            />

            {/* Error Message */}
            {speechError && (
                <div className="bg-red-900/50 text-red-200 px-4 py-2 text-sm flex items-center justify-center gap-2 z-20">
                    <AlertCircle size={16} /> {speechError}
                </div>
            )}

            {/* Prompter Display */}
            <PrompterDisplay
                containerRef={containerRef}
                words={words}
                mode={mode}
                activeIndex={activeIndex}
                fontSize={fontSize}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                isSerif={isSerif}
                wordRefs={wordRefs}
            />
        </div>
    );
};

export default App;
