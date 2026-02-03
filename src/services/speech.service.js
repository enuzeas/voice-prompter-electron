/**
 * Speech Recognition Service
 * Wraps Web Speech API for voice recognition
 */
class SpeechRecognitionService {
    constructor() {
        this.recognition = null;
        this.isSupported = this.checkSupport();
    }

    /**
     * Check if speech recognition is supported
     */
    checkSupport() {
        return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    }

    /**
     * Initialize speech recognition
     */
    initialize(language = 'ko-KR') {
        if (!this.isSupported) {
            throw new Error('Speech recognition is not supported in this browser');
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.lang = language;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;

        return this.recognition;
    }

    /**
     * Start recognition
     */
    start(callbacks = {}) {
        if (!this.recognition) {
            throw new Error('Speech recognition not initialized');
        }

        const { onResult, onError, onEnd } = callbacks;

        if (onResult) {
            this.recognition.onresult = (event) => {
                const results = event.results;
                const transcript = results[results.length - 1][0].transcript.trim();
                const isFinal = results[results.length - 1].isFinal;
                onResult(transcript, isFinal);
            };
        }

        if (onError) {
            this.recognition.onerror = (event) => {
                // Ignore 'no-speech' errors
                if (event.error === 'no-speech') return;
                onError(event.error);
            };
        }

        if (onEnd) {
            this.recognition.onend = onEnd;
        }

        try {
            this.recognition.start();
        } catch (error) {
            console.error('Failed to start recognition:', error);
        }
    }

    /**
     * Stop recognition
     */
    stop() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    /**
     * Change language
     */
    setLanguage(language) {
        if (this.recognition) {
            this.recognition.lang = language;
        }
    }
}

export default new SpeechRecognitionService();
