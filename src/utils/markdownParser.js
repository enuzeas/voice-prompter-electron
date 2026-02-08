/**
 * Parse inline markdown in text
 * Converts markdown syntax to HTML-like React elements
 */
export const parseMarkdown = (text) => {
    if (!text) return text;

    // Replace **bold** with <strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Replace *italic* (but not already processed **)
    text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Replace ~~strikethrough~~
    text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');

    // Replace __underline__
    text = text.replace(/__([^_]+)__/g, '<u>$1</u>');

    // Replace ~~script~~ (Sanskrit)
    text = text.replace(/~~([^~]+)~~/g, '<span class="script-text">$1</span>');

    return text;
};

/**
 * Strip markdown syntax from text (for speech recognition matching)
 */
export const stripMarkdown = (text) => {
    if (!text) return text;

    return text
        .replace(/\*\*([^*]+)\*\*/g, '$1')  // **bold**
        .replace(/\*([^*]+)\*/g, '$1')      // *italic*
        .replace(/~~([^~]+)~~/g, '$1')      // ~~strike~~
        .replace(/__([^_]+)__/g, '$1')      // __underline__
        .trim();
};

/**
 * Convert markdown text to React-renderable format
 * Returns an object with HTML string and clean text
 */
export const prepareMarkdownText = (text) => {
    return {
        html: parseMarkdown(text),
        clean: stripMarkdown(text)
    };
};

export default {
    parseMarkdown,
    stripMarkdown,
    prepareMarkdownText
};
