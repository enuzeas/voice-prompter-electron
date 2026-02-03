import React from 'react';
import WordRenderer from './WordRenderer';

const PrompterDisplay = ({
    containerRef,
    words,
    mode,
    activeIndex,
    fontSize,
    letterSpacing,
    lineHeight,
    isSerif,
    wordRefs
}) => {
    return (
        <div
            ref={containerRef}
            className={`flex-1 overflow-y-auto p-8 relative scroll-smooth no-scrollbar ${isSerif ? 'font-serif' : 'font-sans'
                }`}
            style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
            }}
        >
            {/* Eye Level Guide */}
            <div className="fixed top-1/2 left-0 w-full h-px bg-yellow-500/30 pointer-events-none z-20 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-yellow-500/30">
                    <span className="text-yellow-500 text-[10px] font-bold tracking-widest">
                        {mode === 'voice' ? 'EYE LEVEL' : 'READING LINE'}
                    </span>
                </div>
            </div>

            {/* Text Container */}
            <div className="max-w-4xl mx-auto text-center relative z-10 break-keep py-[40vh]">
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
                    />
                ))}
            </div>
        </div>
    );
};

export default PrompterDisplay;
