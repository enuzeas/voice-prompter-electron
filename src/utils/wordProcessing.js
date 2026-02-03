import { stripMarkdown } from './markdownParser';

/**
 * Process script text into words array
 * Handles newlines and strips markdown for clean processing
 */
export const processScriptToWords = (scriptText) => {
    if (!scriptText) return [];

    // Replace newlines with special marker, then split by spaces
    const processed = scriptText.replace(/\n/g, " \n ").split(' ').filter(w => w.trim() !== "");

    return processed;
};

/**
 * Clean word for matching (remove punctuation and markdown)
 */
export const cleanWord = (word) => {
    if (!word) return '';

    // First strip markdown
    let cleaned = stripMarkdown(word);

    // Then remove punctuation
    cleaned = cleaned.replace(/[.,?!;:]/g, "").trim();

    return cleaned;
};

/**
 * Split text into words for processing
 */
export const splitIntoWords = (text) => {
    if (!text) return [];
    return text.split(' ').filter(w => w.trim() !== '');
};

export default {
    processScriptToWords,
    cleanWord,
    splitIntoWords
};
