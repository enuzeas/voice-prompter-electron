import { useState, useEffect, useRef } from 'react';
import presentationService from '../services/presentation.service';

/**
 * Custom hook for presentation mode
 */
const usePresentationMode = (scriptData, settings) => {
    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [presentationActiveIndex, setPresentationActiveIndex] = useState(0);
    const isPresentationWindowRef = useRef(false);

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
        if (isPresentationWindowRef.current) {
            presentationService.initialize();
            presentationService.onMessage((message) => {
                if (message.type === 'update-active-index') {
                    setPresentationActiveIndex(message.data);
                }
            });
        }
    }, []);

    // Open presentation window
    const openPresentation = () => {
        presentationService.initialize();
        presentationService.openPresentationWindow(scriptData, settings);
        setIsPresentationMode(true);
    };

    // Close presentation window
    const closePresentation = () => {
        presentationService.closePresentationWindow();
        setIsPresentationMode(false);
    };

    // Send active index update to presentation window
    const updatePresentationIndex = (index) => {
        if (isPresentationMode) {
            presentationService.sendUpdate('update-active-index', index);
        }
    };

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
