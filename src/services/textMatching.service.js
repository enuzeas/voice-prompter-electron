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

    // List of common short filler words to ignore for loose matching (English mostly)
    const STOP_WORDS = new Set([
        'a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'is', 'it', 'that', 'this',
        'and', 'or', 'but', 'if', 'so', 'as', 'by', 'for', 'with', 'be', 'are'
    ]);

    // Check the last few spoken words (most recent ones)
    for (let j = 0; j < checkRange; j++) {
        const spokenIndex = spokenWords.length - 1 - j;
        const spokenWord = spokenWords[spokenIndex];
        const target = cleanWord(spokenWord);

        // Skip extremely short words unless they are exact matches next to current
        if (target.length < 2 && !['i', 'a'].includes(target.toLowerCase())) continue;

        const isStopWord = STOP_WORDS.has(target.toLowerCase());

        // Search for the word in script within look-ahead range
        // Handle negative index (start of script)
        const startIndex = Math.max(0, currentIndex);
        for (let i = startIndex; i < searchLimit; i++) {
            const scriptWord = cleanWord(words[i]);

            // Check if words match (either direction for partial matches)
            // Stricter match for short words
            const isMatch = scriptWord.toLowerCase() === target.toLowerCase() ||
                (target.length > 3 && (scriptWord.includes(target) || target.includes(scriptWord)));

            if (isMatch) {
                const jumpDistance = i - currentIndex;

                // Case 1: Very close match (immediate next few words)
                if (jumpDistance <= 2) {
                    // For stop words, require EXACT next position or very strong context
                    if (isStopWord && jumpDistance > 1) {
                        continue;
                    }
                    return i;
                }

                // Case 2: Jump (3+ words away)
                // STRICTER RULES for jumps to prevent skimming/skipping

                // Rule A: Never jump on a stop word alone
                if (isStopWord) continue;

                // Rule B: Verify with Context (Previous word must match)
                const prevSpokenIndex = spokenIndex - 1;
                const prevScriptIndex = i - 1;
                let isContextMatch = false;

                if (prevSpokenIndex >= 0 && prevScriptIndex >= 0) {
                    const prevSpoken = cleanWord(spokenWords[prevSpokenIndex]);
                    const prevScript = cleanWord(words[prevScriptIndex]);

                    if (prevScript && prevSpoken &&
                        (prevScript.includes(prevSpoken) || prevSpoken.includes(prevScript))) {
                        isContextMatch = true;
                    }
                }

                if (isContextMatch) {
                    return i;
                }

                // Rule C: Unique Word Check
                let occurrenceCount = 0;
                for (let k = currentIndex; k < searchLimit; k++) {
                    if (cleanWord(words[k]).includes(target)) occurrenceCount++;
                }

                if (occurrenceCount === 1 && target.length > 4) {
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
