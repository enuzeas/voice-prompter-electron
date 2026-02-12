import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header/Header';
import SettingsPanel from './components/Settings/SettingsPanel';
import ScriptEditor from './components/ScriptEditor/ScriptEditor';
import PrompterDisplay from './components/Prompter/PrompterDisplay';
import useIndexedDB from './hooks/useIndexedDB';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import useAutoScroll from './hooks/useAutoScroll';
import usePresentationMode from './hooks/usePresentationMode';
import { processScriptToWords } from './utils/wordProcessing';
import keyboardHandler from './utils/keyboardHandler';
import { downloadTextFile } from './utils/fileHandler';
import defaultScript from './constants/defaultScript';

const App = () => {
    // Mode and UI state
    const [mode, setMode] = useState('voice');
    const [showSettings, setShowSettings] = useState(false);
    const [showScriptEditor, setShowScriptEditor] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('ko-KR');

    // Refs
    const containerRef = useRef(null);
    const audioDeviceSelectorRef = useRef(null);

    // IndexedDB persistence
    const { config, updateConfig, saveStatus } = useIndexedDB({
        scriptText: defaultScript,
        fontSize: 48,
        letterSpacing: 0,
        isSerif: false,
        lineHeight: 1.6,
        manualSpeed: 3,
        language: 'ko-KR',
        language: 'ko-KR',
        audioDeviceId: 'default',
        isMirrored: false
    });

    // Derived state from config
    const { scriptText, fontSize, letterSpacing, isSerif, lineHeight, manualSpeed, audioDeviceId, isMirrored } = config;

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

    // Presentation mode
    const {
        isPresentationMode,
        isPresentationWindow,
        presentationActiveIndex,
        openPresentation,
        closePresentation,
        updatePresentationIndex
    } = usePresentationMode(
        config, // scriptData (using config as it has scriptText)
        config, // settings
        updateConfig // onSettingsUpdate
    );

    // Sync active index with presentation window
    useEffect(() => {
        if (isPresentationMode) {
            updatePresentationIndex(activeIndex);
        }
    }, [activeIndex, isPresentationMode, updatePresentationIndex]);

    // Auto-scroll to active word in Presentation Window
    useEffect(() => {
        if (isPresentationWindow && wordRefs.current[presentationActiveIndex]) {
            wordRefs.current[presentationActiveIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [isPresentationWindow, presentationActiveIndex]);

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

    // Fullscreen toggle
    const handleToggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // File save handler (Ctrl+S)
    const handleFileSave = () => {
        downloadTextFile(scriptText, 'script.txt');
    };

    // Audio device change handler
    const handleDeviceChange = (deviceId) => {
        updateConfig({ audioDeviceId: deviceId });
    };

    // Stream ready handler for speech recognition
    const handleStreamReady = (stream) => {
        // Pass stream to speech service if needed
        // Currently speech.service uses default device, but we could extend it
        console.log('Audio stream ready:', stream);
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
        keyboardHandler.register('FULLSCREEN', handleToggleFullscreen);
        keyboardHandler.register('PRESENTATION_MODE', () => {
            if (isPresentationMode) {
                closePresentation();
            } else {
                openPresentation();
            }
        });
        keyboardHandler.register('SAVE_FILE', handleFileSave);

        keyboardHandler.start();

        return () => {
            keyboardHandler.stop();
            keyboardHandler.clear();
        };
    }, [mode, toggleListening, togglePlay, handleReset, isPresentationMode, openPresentation, closePresentation]);

    // If running in presentation window, show only prompter display
    if (isPresentationWindow) {
        return (
            <div className={`flex flex-col h-screen bg-black text-white`}>
                <PrompterDisplay
                    containerRef={containerRef}
                    words={words}
                    mode={mode}
                    activeIndex={presentationActiveIndex}
                    fontSize={fontSize}
                    letterSpacing={letterSpacing}
                    lineHeight={lineHeight}
                    isSerif={isSerif}
                    wordRefs={wordRefs}
                    isMirrored={isMirrored}
                />
            </div>
        );
    }

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
                onToggleFullscreen={handleToggleFullscreen}
                onOpenPresentation={isPresentationMode ? closePresentation : openPresentation}
                isPresentationMode={isPresentationMode}
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
                    selectedDeviceId={audioDeviceId}
                    onDeviceChange={handleDeviceChange}
                    onStreamReady={handleStreamReady}
                    isMirrored={isMirrored}
                    onMirrorChange={(mirrored) => updateConfig({ isMirrored: mirrored })}
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
                isMirrored={false} // Operator view always normal
            />
        </div>
    );
};

export default App;
