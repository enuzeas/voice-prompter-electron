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

            // Smart Sentence Advance Logic
            // Check for attached punctuation (English style: "Hello,")
            const hasAttachedPunctuation = /[.,!?;:。、]$/.test(matchedWord);

            console.log('Smart Advance Debug:', {
                matchedWord,
                matchedIndex,
                hasAttachedPunctuation,
                nextWords: words.slice(matchedIndex + 1, matchedIndex + 4)
            });

            if (hasAttachedPunctuation) {
                // If attached, move to at least the next word
                nextIndex = matchedIndex + 1;
                console.log('Attached punctuation found, initial move to:', nextIndex);
            }

            // Check for separate punctuation tokens (CJK style: "Hello", "、")
            // Look ahead for punctuation-only tokens and skip them
            // STRICT REGEX: Only skip actual punctuation, NOT whitespace (which shouldn't be here) or other characters
            // Removed \s to be safe
            let tempIndex = nextIndex;
            while (tempIndex < words.length && /^[.,!?;:。、]+$/.test(words[tempIndex])) {
                console.log(`Skipping punctuation token at ${tempIndex}:`, words[tempIndex]);
                tempIndex++;
            }

            // Update nextIndex if we advanced
            if (tempIndex > nextIndex) {
                nextIndex = tempIndex;
                console.log('Advanced past punctuation to:', nextIndex);
            }

            // Ensure we don't go out of bounds
            if (nextIndex >= words.length) {
                nextIndex = words.length - 1;
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
