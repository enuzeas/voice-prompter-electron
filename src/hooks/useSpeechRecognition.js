import { useState, useEffect, useRef, useCallback } from 'react';
import speechService from '../services/speech.service';
import { matchSpokenText } from '../services/textMatching.service';

/**
 * Custom hook for speech recognition
 */
const useSpeechRecognition = (words, language = 'ko-KR') => {
    const [isListening, setIsListening] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [error, setError] = useState('');

    const activeIndexRef = useRef(-1);
    const isListeningRef = useRef(false);
    const wordRefs = useRef([]);

    // Initialize speech recognition
    useEffect(() => {
        if (!speechService.isSupported) {
            setError('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
            return;
        }

        try {
            speechService.initialize(language);
        } catch (err) {
            setError(err.message);
        }
    }, [language]);

    // Handle recognition result
    const handleResult = useCallback((transcript, isFinal) => {
        const matchedIndex = matchSpokenText(
            transcript,
            words,
            activeIndexRef.current
        );

        if (matchedIndex !== -1 && matchedIndex !== activeIndexRef.current) {
            activeIndexRef.current = matchedIndex;
            setActiveIndex(matchedIndex);

            // Scroll to matched word
            if (wordRefs.current[matchedIndex]) {
                wordRefs.current[matchedIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [words]);

    // Handle recognition end (restart if still listening)
    const handleEnd = useCallback(() => {
        if (isListeningRef.current) {
            try {
                speechService.start({
                    onResult: handleResult,
                    onError: (err) => {
                        if (err === 'not-allowed') {
                            setError('마이크 권한이 필요합니다.');
                            stopListening();
                        }
                    },
                    onEnd: handleEnd
                });
            } catch (err) {
                console.error('Failed to restart recognition:', err);
            }
        }
    }, [handleResult]);

    // Start listening
    const startListening = useCallback(() => {
        if (!speechService.isSupported) return;

        try {
            speechService.start({
                onResult: handleResult,
                onError: (err) => {
                    if (err === 'not-allowed') {
                        setError('마이크 권한이 필요합니다.');
                        stopListening();
                    }
                },
                onEnd: handleEnd
            });

            setIsListening(true);
            isListeningRef.current = true;
            setError('');
        } catch (err) {
            setError('음성 인식을 시작할 수 없습니다.');
        }
    }, [handleResult, handleEnd]);

    // Stop listening
    const stopListening = useCallback(() => {
        speechService.stop();
        setIsListening(false);
        isListeningRef.current = false;
    }, []);

    // Toggle listening
    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    // Reset position
    const resetPosition = useCallback(() => {
        activeIndexRef.current = -1;
        setActiveIndex(-1);
    }, []);

    // Change language
    const setLanguage = useCallback((newLanguage) => {
        speechService.setLanguage(newLanguage);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
        };
    }, [stopListening]);

    return {
        isListening,
        activeIndex,
        error,
        wordRefs,
        startListening,
        stopListening,
        toggleListening,
        resetPosition,
        setLanguage
    };
};

export default useSpeechRecognition;
