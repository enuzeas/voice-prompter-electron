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
            let nextIndex = matchedIndex;
            const matchedWord = words[matchedIndex];

            // Smart Sentence Advance:
            // If the word ends with punctuation OR is punctuation (common in CJK),
            // automatically advance to the next word to help flow.
            // Checks for . , ! ? ; : and common CJK punctuation 。 、
            const isPunctuationOrHasSuffix = /[.,!?;:。、]$/.test(matchedWord);

            if (isPunctuationOrHasSuffix && matchedIndex + 1 < words.length) {
                nextIndex = matchedIndex + 1;
            }

            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);

            // Scroll to matched word (or the next one if skipped)
            if (wordRefs.current[nextIndex]) {
                wordRefs.current[nextIndex].scrollIntoView({
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

    // Manually set speech index (Click-to-jump)
    const setSpeechIndex = useCallback((index) => {
        activeIndexRef.current = index;
        setActiveIndex(index);
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
        setLanguage,
        setSpeechIndex
    };
};

export default useSpeechRecognition;
