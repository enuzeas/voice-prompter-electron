import { useState, useEffect, useRef, useCallback } from 'react';
import presentationService from '../services/presentation.service';

/**
 * Custom hook for presentation mode
 */
const usePresentationMode = (scriptData, settings, onSettingsUpdate, activeIndex, mode, isListening, isPlaying, onModeUpdate, onIsListeningUpdate, onIsPlayingUpdate, onScrollUpdate) => {
    // Initial check for presentation window mode (static after load)
    const [isPresentationWindow, setIsPresentationWindow] = useState(() => {
        const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
        return urlParams.get('mode') === 'presentation';
    });

    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [presentationActiveIndex, setPresentationActiveIndex] = useState(0);
    const presentationWindowRef = useRef(null);

    // Fullscreen for presentation window
    useEffect(() => {
        if (isPresentationWindow) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log('Fullscreen request failed:', err);
                });
            }
        }
    }, [isPresentationWindow]);

    // Listen for messages from main window
    useEffect(() => {
        presentationService.initialize();

        if (isPresentationWindow) {
            presentationService.onMessage((message) => {
                if (message.type === 'update-active-index') {
                    setPresentationActiveIndex(message.data);
                } else if (message.type === 'update-settings') {
                    if (onSettingsUpdate) onSettingsUpdate(message.data);
                } else if (message.type === 'update-mode') {
                    if (onModeUpdate) onModeUpdate(message.data);
                } else if (message.type === 'update-is-listening') {
                    if (onIsListeningUpdate) onIsListeningUpdate(message.data);
                } else if (message.type === 'update-is-playing') {
                    if (onIsPlayingUpdate) onIsPlayingUpdate(message.data);
                } else if (message.type === 'update-scroll-top') {
                    if (onScrollUpdate) onScrollUpdate(message.data);
                }
            });
        }
    }, [isPresentationWindow, onSettingsUpdate, onModeUpdate, onIsListeningUpdate, onIsPlayingUpdate, onScrollUpdate]);

    // Open presentation window
    const openPresentation = useCallback(() => {
        if (presentationWindowRef.current && !presentationWindowRef.current.closed) {
            presentationWindowRef.current.focus();
            return;
        }

        // Store data in localStorage for presentation window to read (SHARED between windows/tabs/extension pages)
        localStorage.setItem('presentation-script', JSON.stringify(scriptData));
        localStorage.setItem('presentation-settings', JSON.stringify(settings));

        // Check if running as Chrome Extension
        const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

        if (isExtension) {
            chrome.windows.create({
                url: 'index.html?mode=presentation',
                type: 'popup',
                width: 1024,
                height: 768,
                focused: true
            }, (window) => {
                // In extension mode, we can't easily get the window object reference like window.open
                // But BroadcastChannel will still work fine for communication
                // We just store a dummy visible state or try to get the view properly if needed
                setIsPresentationMode(true);
            });
        } else {
            // Standard Web App Config
            const width = 1024;
            const height = 768;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            const newWindow = window.open(
                '/?mode=presentation',
                'PrompterPresentation',
                `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
            );

            if (newWindow) {
                presentationWindowRef.current = newWindow;
                setIsPresentationMode(true);

                // Initial sync
                // Note: presentationService.initialize() is called here implicitly by the new window
                // when it loads. We just need to send the initial state.
                presentationService.sendUpdate('update-active-index', activeIndex);
                presentationService.sendUpdate('update-settings', settings); // Also sync initial settings
            }
        }
    }, [settings, activeIndex]); // Added settings and activeIndex to dependencies for initial sync

    // Close presentation window
    const closePresentation = () => {
        if (presentationWindowRef.current) {
            presentationWindowRef.current.close();
            presentationWindowRef.current = null;
        }
        // For extension, we can't directly close the window from here easily
        // The user would close it manually.
        setIsPresentationMode(false);
    };

    // Send scroll update to presentation window
    const updatePresentationScroll = useCallback((scrollTop) => {
        if (isPresentationMode && !isPresentationWindow) {
            presentationService.sendUpdate('update-scroll-top', scrollTop);
        }
    }, [isPresentationMode, isPresentationWindow]);

    // Send active index update to presentation window
    const updatePresentationIndex = useCallback((index) => {
        if (isPresentationMode) {
            presentationService.sendUpdate('update-active-index', index);
        }
    }, [isPresentationMode]);

    // Sync settings to presentation window
    useEffect(() => {
        if (isPresentationMode && !isPresentationWindow) {
            presentationService.sendUpdate('update-settings', settings);
        }
    }, [settings, isPresentationMode, isPresentationWindow]);

    // Sync mode and playing states
    useEffect(() => {
        if (isPresentationMode && !isPresentationWindow) {
            presentationService.sendUpdate('update-mode', mode);
        }
    }, [mode, isPresentationMode, isPresentationWindow]);

    useEffect(() => {
        if (isPresentationMode && !isPresentationWindow) {
            presentationService.sendUpdate('update-is-listening', isListening);
        }
    }, [isListening, isPresentationMode, isPresentationWindow]);

    useEffect(() => {
        if (isPresentationMode && !isPresentationWindow) {
            presentationService.sendUpdate('update-is-playing', isPlaying);
        }
    }, [isPlaying, isPresentationMode, isPresentationWindow]);

    return {
        isPresentationMode,
        isPresentationWindow,
        presentationActiveIndex,
        openPresentation,
        closePresentation,
        updatePresentationIndex,
        updatePresentationScroll
    };
};

export default usePresentationMode;
