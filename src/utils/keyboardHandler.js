import keyboardShortcuts, { matchesShortcut } from '../constants/keyboardShortcuts';

/**
 * Keyboard handler utility
 * Manages global keyboard shortcuts
 */
class KeyboardHandler {
    constructor() {
        this.handlers = new Map();
        this.isListening = false;
    }

    /**
     * Register a keyboard shortcut handler
     */
    register(shortcutKey, callback) {
        const shortcut = keyboardShortcuts[shortcutKey];
        if (!shortcut) {
            console.warn(`Unknown shortcut: ${shortcutKey}`);
            return;
        }

        this.handlers.set(shortcutKey, { shortcut, callback });
    }

    /**
     * Unregister a keyboard shortcut handler
     */
    unregister(shortcutKey) {
        this.handlers.delete(shortcutKey);
    }

    /**
     * Handle keyboard event
     */
    handleKeyDown = (event) => {
        // Don't trigger shortcuts when typing in inputs/textareas
        const target = event.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            // Exception: allow Escape to close modals
            if (event.key === 'Escape') {
                // Continue
            } else {
                return;
            }
        }

        for (const [key, { shortcut, callback }] of this.handlers.entries()) {
            if (matchesShortcut(event, shortcut)) {
                event.preventDefault();
                callback(event);
                return;
            }
        }
    };

    /**
     * Start listening to keyboard events
     */
    start() {
        if (this.isListening) return;

        window.addEventListener('keydown', this.handleKeyDown);
        this.isListening = true;
    }

    /**
     * Stop listening to keyboard events
     */
    stop() {
        if (!this.isListening) return;

        window.removeEventListener('keydown', this.handleKeyDown);
        this.isListening = false;
    }

    /**
     * Clear all handlers
     */
    clear() {
        this.handlers.clear();
    }
}

// Singleton instance
const keyboardHandler = new KeyboardHandler();

export default keyboardHandler;
