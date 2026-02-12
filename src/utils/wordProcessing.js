import { stripMarkdown } from './markdownParser';

/**
 * Process script text into words array
 * Handles newlines and strips markdown for clean processing
 */
export const processScriptToWords = (scriptText, language = 'ko-KR') => {
    if (!scriptText) return [];

    // Check if browser supports Intl.Segmenter
    const hasIntlSegmenter = typeof Intl.Segmenter !== 'undefined';

    // Check if CJK language (Chinese, Japanese, Korean)
    const isCJK = /^(zh|ja|ko)/.test(language);

    if (hasIntlSegmenter && isCJK) {
        // Use Intl.Segmenter for CJK
        const segmenter = new Intl.Segmenter(language, { granularity: 'word' });
        const segments = segmenter.segment(scriptText);

        const processed = [];
        for (const segment of segments) {
            // Filter out whitespace-only segments, but keep others
            // Note: Intl.Segmenter with 'word' granularity returns punctuation as segments too
            if (segment.segment.trim() !== '') {
                processed.push(segment.segment);
            } else if (segment.segment.includes('\n')) {
                // Preserve newlines as special markers for layout if needed, 
                // but usually we just want words. 
                // However, matching logic expects meaningful tokens.
                // Let's add a break marker if it's a newline to keep visual structure potential
                // OR just ignore. 
                // Based on previous code: text.replace(/\n/g, " \n ")
                processed.push('\n');
            }
        }

        // Filter out the pure newline markers for now to match previous behavior 
        // which returned an array of words. 
        // Actually, the previous code mapped \n to " \n " then split. 
        // If we want to support visual breaks, we should verify how the UI handles it.
        // The UI maps words. NEWLINE handling might be implicitly done by the component 
        // if it renders a <br/>? 
        // Looking at PrompterDisplay, it renders WordRenderer.
        // Let's stick to the previous pattern: 
        // processed = scriptText.replace(/\n/g, " \n ").split(' ')
        // But for CJK, meaningful segmentation is key.

        // Let's refine: simpler approach that matches the output format of previous code
        return Array.from(segments)
            .map(s => s.segment)
            .filter(s => s.trim() !== '' || s === '\n') // Keep words and newlines
            .map(s => s === '\n' ? '\n' : s); // Ensure normalization
    }

    // Fallback or non-CJK (Original Logic refined)
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
