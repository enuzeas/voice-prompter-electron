import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for auto-scroll functionality
 */
const useAutoScroll = (containerRef, speed = 3) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(speed);
    const animationFrameRef = useRef(null);

    // Sync scrollSpeed with external speed prop
    useEffect(() => {
        setScrollSpeed(speed);
    }, [speed]);

    // Animation loop
    useEffect(() => {
        const animateScroll = () => {
            if (isPlaying && containerRef.current) {
                const scrollAmount = scrollSpeed * 0.5;
                containerRef.current.scrollTop += scrollAmount;
                animationFrameRef.current = requestAnimationFrame(animateScroll);
            }
        };

        if (isPlaying) {
            animationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying, scrollSpeed, containerRef]);

    // Toggle play/pause
    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    // Start playing
    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    // Pause
    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    // Reset scroll position
    const reset = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
        setIsPlaying(false);
    }, [containerRef]);

    // Update speed
    const updateSpeed = useCallback((newSpeed) => {
        setScrollSpeed(newSpeed);
    }, []);

    return {
        isPlaying,
        scrollSpeed,
        togglePlay,
        play,
        pause,
        reset,
        updateSpeed
    };
};

export default useAutoScroll;
