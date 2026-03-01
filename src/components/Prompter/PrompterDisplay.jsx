import React, { useRef, useState, useEffect } from 'react';
import WordRenderer from './WordRenderer';
import useAudioLevel from '../../hooks/useAudioLevel';

const PrompterDisplay = ({
    containerRef,
    words,
    mode,
    activeIndex,
    fontSize,
    letterSpacing,
    lineHeight,
    isSerif,
    wordRefs,
    isMirrored,
    audioDeviceId,
    isListening,
    onWordClick,
    isPresentationWindow = false
}) => {
    const audioGlowRef = useRef(null);
    const wrapperRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(0);

    // Disable local microphone monitoring in presentation window to avoid hardware conflicts
    const effectiveDeviceId = isPresentationWindow ? 'none' : audioDeviceId;
    useAudioLevel(effectiveDeviceId, mode === 'voice' && isListening, audioGlowRef);

    // Track identical physical height for perfect padding offset sync
    useEffect(() => {
        if (!wrapperRef.current) return;

        const observer = new ResizeObserver((entries) => {
            if (entries[0] && wrapperRef.current) {
                setContainerHeight(entries[0].contentRect.height);
            }
        });

        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapperRef} className="flex-1 relative w-full h-full overflow-hidden">
            {/* Eye Level Guide (Anchored mathematically to exact center of wrapper) */}
            <div className="absolute top-1/2 left-0 w-full z-20 pointer-events-none flex items-center justify-center transform -translate-y-1/2">
                <div ref={audioGlowRef} className="relative flex items-center justify-center">
                    {/* Audio Reactive Glow */}
                    {mode === 'voice' && isListening && (
                        <div
                            className="absolute inset-0 bg-green-500/50 blur-md rounded-full transition-transform duration-75 ease-out"
                            style={{
                                opacity: 'var(--audio-opacity, 0.2)',
                                transform: 'scale(var(--audio-scale, 1))'
                            }}
                        />
                    )}

                    <div className={`relative px-3 py-1 rounded-full border backdrop-blur transition-all duration-300 ${mode === 'voice' && isListening ? 'bg-black/50 border-yellow-500/30' : 'bg-black/50 border-yellow-500/30'
                        }`}
                    >
                        <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${mode === 'voice' && isListening ? 'text-yellow-500' : 'text-yellow-500'
                            }`}>
                            {mode === 'voice' ? 'EYE LEVEL' : 'READING LINE'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Scrolling Content Container */}
            <div
                ref={containerRef}
                className={`absolute inset-0 overflow-y-auto px-8 no-scrollbar ${isSerif ? 'font-serif' : 'font-sans'}`}
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                }}
            >
                {/* Dynamic Top Padding equals exactly half of container to align perfectly */}
                <div style={{ height: `${Math.max(0, containerHeight / 2)}px` }} className="w-full shrink-0" />

                <div
                    className="max-w-4xl mx-auto text-center relative z-10 break-keep"
                    style={{
                        transform: isMirrored ? 'scaleX(-1)' : 'none',
                        transformOrigin: 'center'
                    }}
                >
                    {words.map((word, index) => (
                        <WordRenderer
                            key={index}
                            word={word}
                            index={index}
                            mode={mode}
                            activeIndex={activeIndex}
                            fontSize={fontSize}
                            letterSpacing={letterSpacing}
                            lineHeight={lineHeight}
                            wordRef={(el) => (wordRefs.current[index] = el)}
                            onWordClick={onWordClick}
                        />
                    ))}
                </div>

                {/* Dynamic Bottom Padding */}
                <div style={{ height: `${Math.max(0, containerHeight / 2)}px` }} className="w-full shrink-0" />
            </div>
        </div>
    );
};

export default PrompterDisplay;
