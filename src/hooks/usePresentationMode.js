import { useState, useEffect, useRef, useCallback } from 'react';
import presentationService from '../services/presentation.service';

/**
 * Custom hook for presentation mode
 */
const usePresentationMode = (scriptData, settings, onSettingsUpdate, activeIndex) => {
    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [presentationActiveIndex, setPresentationActiveIndex] = useState(0);
    const isPresentationWindowRef = useRef(false);
    const presentationWindowRef = useRef(null);

    // Check if running in presentation window
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        isPresentationWindowRef.current = urlParams.get('mode') === 'presentation';

        if (isPresentationWindowRef.current) {
            // Request fullscreen in presentation window
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log('Fullscreen request failed:', err);
                });
            }
        }
    }, []);

    // Listen for messages from main window
    useEffect(() => {
        presentationService.initialize();

        if (isPresentationWindowRef.current) {
            presentationService.onMessage((message) => {
                if (message.type === 'update-active-index') {
                    setPresentationActiveIndex(message.data);
                } else if (message.type === 'update-settings') {
                    if (onSettingsUpdate) {
                        onSettingsUpdate(message.data);
                    }
                }
            });
        }
    }, []);

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

    // Send active index update to presentation window
    const updatePresentationIndex = (index) => {
        if (isPresentationMode) {
            presentationService.sendUpdate('update-active-index', index);
        }
    };

    // Sync settings to presentation window
    useEffect(() => {
        if (isPresentationMode && !isPresentationWindowRef.current) {
            presentationService.sendUpdate('update-settings', settings);
        }
    }, [settings, isPresentationMode]);

    return {
        isPresentationMode,
        isPresentationWindow: isPresentationWindowRef.current,
        presentationActiveIndex,
        openPresentation,
        closePresentation,
        updatePresentationIndex
    };
};

export default usePresentationMode;
