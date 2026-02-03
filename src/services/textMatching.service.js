import { cleanWord } from '../utils/wordProcessing';

/**
 * Text Matching Service
 * Intelligent algorithm to match spoken text with script
 */

/**
 * Match spoken text with script words
 * Returns the index of the best match or -1 if no match found
 */
export const matchSpokenText = (spokenText, words, currentIndex, lookAhead = 20) => {
    if (!spokenText || !words || words.length === 0) return -1;

    const searchLimit = Math.min(words.length, currentIndex + lookAhead);
    const spokenWords = spokenText.split(' ');
    const checkRange = Math.min(spokenWords.length, 3);

    // Check the last few spoken words (most recent ones)
    for (let j = 0; j < checkRange; j++) {
        const spokenIndex = spokenWords.length - 1 - j;
        const spokenWord = spokenWords[spokenIndex];
        const target = cleanWord(spokenWord);

        if (target.length < 2) continue;

        // Search for the word in script within look-ahead range
        for (let i = currentIndex; i < searchLimit; i++) {
            const scriptWord = cleanWord(words[i]);

            // Check if words match (either direction for partial matches)
            if (scriptWord.includes(target) || target.includes(scriptWord)) {
                const jumpDistance = i - currentIndex;

                // If it's very close, just accept it
                if (jumpDistance <= 5) {
                    return i;
                }

                // For larger jumps, verify with context (previous word)
                const prevSpokenIndex = spokenIndex - 1;
                const prevScriptIndex = i - 1;
                let isContextMatch = false;

                if (prevSpokenIndex >= 0 && prevScriptIndex >= 0) {
                    const prevSpoken = cleanWord(spokenWords[prevSpokenIndex]);
                    const prevScript = cleanWord(words[prevScriptIndex]);
                    if (prevScript.includes(prevSpoken) || prevSpoken.includes(prevScript)) {
                        isContextMatch = true;
                    }
                }

                if (isContextMatch) {
                    return i;
                }

                // Check if this word only appears once in the search range (unique word)
                let occurrenceCount = 0;
                for (let k = currentIndex; k < searchLimit; k++) {
                    if (cleanWord(words[k]).includes(target)) occurrenceCount++;
                }

                if (occurrenceCount === 1) {
                    return i;
                }
            }
        }
    }

    return -1; // No match found
};

/**
 * Calculate match confidence score
 */
export const calculateMatchConfidence = (spokenText, scriptWord) => {
    const spoken = cleanWord(spokenText).toLowerCase();
    const script = cleanWord(scriptWord).toLowerCase();

    if (spoken === script) return 1.0;
    if (spoken.includes(script) || script.includes(spoken)) return 0.8;

    // Levenshtein distance could be added here for fuzzy matching
    return 0.0;
};

export default {
    matchSpokenText,
    calculateMatchConfidence
};
