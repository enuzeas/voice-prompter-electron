/**
 * Presentation Mode Service
 * Handles communication between main window and presentation window
 */
class PresentationService {
    constructor() {
        this.channel = null;
        this.presentationWindow = null;
        this.isPresentationMode = false;
    }

    /**
     * Initialize the broadcast channel
     */
    initialize() {
        if (typeof BroadcastChannel === 'undefined') {
            console.warn('BroadcastChannel not supported');
            return;
        }
        this.channel = new BroadcastChannel('voice-prompter-presentation');
    }

    /**
     * Open presentation window
     */
    openPresentationWindow(scriptData, settings) {
        if (this.presentationWindow && !this.presentationWindow.closed) {
            this.presentationWindow.focus();
            return;
        }

        // Store data in localStorage for presentation window to read
        localStorage.setItem('presentation-script', JSON.stringify(scriptData));
        localStorage.setItem('presentation-settings', JSON.stringify(settings));

        // Open new window
        const width = window.screen.availWidth;
        const height = window.screen.availHeight;
        const features = `width=${width},height=${height},fullscreen=yes,menubar=no,toolbar=no,location=no,status=no`;

        this.presentationWindow = window.open(
            window.location.href + '?mode=presentation',
            'VoicePrompterPresentation',
            features
        );

        this.isPresentationMode = true;

        // Clean up when window closes
        this.presentationWindow.onbeforeunload = () => {
            this.presentationWindow = null;
            this.isPresentationMode = false;
        };
    }

    /**
     * Close presentation window
     */
    closePresentationWindow() {
        if (this.presentationWindow && !this.presentationWindow.closed) {
            this.presentationWindow.close();
        }
        this.presentationWindow = null;
        this.isPresentationMode = false;
    }

    /**
     * Send update to presentation window
     */
    sendUpdate(type, data) {
        if (this.channel) {
            this.channel.postMessage({ type, data });
        }
    }

    /**
     * Listen for messages from presentation window
     */
    onMessage(callback) {
        if (this.channel) {
            this.channel.onmessage = (event) => {
                callback(event.data);
            };
        }
    }

    /**
     * Close channel
     */
    close() {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
    }
}

export default new PresentationService();
