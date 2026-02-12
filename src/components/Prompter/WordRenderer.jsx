import React from 'react';
import { parseMarkdown } from '../../utils/markdownParser';

const WordRenderer = ({
    word,
    index,
    mode,
    activeIndex,
    fontSize,
    letterSpacing,
    lineHeight,
    wordRef
}) => {
    const isNewLine = word === "\n";

    if (isNewLine) {
        return <br key={index} className="block" style={{ marginBottom: `${fontSize * 0.8}px` }} />;
    }

    // Styling logic
    let colorClass = 'text-gray-400';
    let opacity = 1;
    let blur = 0;
    let scale = 1;
    let isHighlighted = false;

    if (mode === 'voice') {
        const isActive = index === activeIndex;
        const isUpcoming = index > activeIndex && index <= activeIndex + 15;
        const isPassed = index < activeIndex;

        if (isActive) {
            isHighlighted = true;
            colorClass = 'text-yellow-400';
            scale = 1.1;
            opacity = 1;
        } else if (isUpcoming) {
            colorClass = 'text-white';
            opacity = 0.8;
        } else if (isPassed) {
            colorClass = 'text-gray-600';
            opacity = 0.2;
            blur = 2;
        } else {
            opacity = 0.2;
        }

        // Determine transition duration: 1s for fading out from active
        const transitionDuration = isPassed ? 'duration-1000' : 'duration-150';

        return (
            <span
                key={index}
                ref={wordRef}
                className={`inline-block transition-all ease-out ${transitionDuration} ${colorClass}`}
                style={{
                    fontSize: `${fontSize}px`,
                    letterSpacing: `${letterSpacing}px`,
                    lineHeight: lineHeight,
                    marginRight: `${fontSize * 0.3}px`,
                    opacity: opacity,
                    filter: `blur(${blur}px)`,
                    transform: `scale(${scale})`,
                    textShadow: isHighlighted ? '0 0 30px rgba(253, 224, 71, 0.6)' : 'none',
                    fontWeight: isHighlighted ? 800 : 600
                }}
                dangerouslySetInnerHTML={hasMarkdown ? { __html: parsedWord } : undefined}
            >
                {hasMarkdown ? undefined : word}
            </span>
        );
    }

    // Manual mode or default fallback
    colorClass = 'text-white';
    opacity = 0.9;

    return (
        <span
            key={index}
            ref={wordRef}
            className={`inline-block transition-all duration-150 ease-out ${colorClass}`}
            style={{
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}px`,
                lineHeight: lineHeight,
                marginRight: `${fontSize * 0.3}px`,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                transform: `scale(${scale})`,
                textShadow: isHighlighted ? '0 0 30px rgba(253, 224, 71, 0.6)' : 'none',
                fontWeight: isHighlighted ? 800 : 600
            }}
            dangerouslySetInnerHTML={hasMarkdown ? { __html: parsedWord } : undefined}
        >
            {hasMarkdown ? undefined : word}
        </span>
    );
};

export default WordRenderer;
