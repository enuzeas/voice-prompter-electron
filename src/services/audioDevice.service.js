/**
 * Audio Device Selection Service
 * Provides microphone selection and audio level monitoring
 */
class AudioDeviceService {
    constructor() {
        this.stream = null;
        this.analyser = null;
        this.audioContext = null;
        this.microphone = null;
        this.dataArray = null;
        this.isSupported = this.checkSupport();
    }

    /**
     * Check if audio device enumeration is supported
     */
    checkSupport() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    }

    /**
     * Get available audio input devices
     */
    async getAudioDevices() {
        if (!this.isSupported) {
            return [];
        }

        try {
            // Request permission first
            await this.requestPermission();
            
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices
                .filter(device => device.kind === 'audioinput')
                .map(device => ({
                    deviceId: device.deviceId,
                    label: device.label || `마이크 ${device.deviceId.slice(0, 8)}...`,
                    groupId: device.groupId
                }));
        } catch (error) {
            console.error('Failed to get audio devices:', error);
            return [];
        }
    }

    /**
     * Request microphone permission
     */
    async requestPermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Stop the stream immediately, we just wanted permission
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (error) {
            console.error('Microphone permission denied:', error);
            throw new Error('마이크 권한이 필요합니다.');
        }
    }

    /**
     * Start audio monitoring for selected device
     */
    async startMonitoring(deviceId, onAudioLevel) {
        try {
            // Stop existing stream
            this.stopMonitoring();

            const constraints = {
                audio: {
                    deviceId: deviceId ? { exact: deviceId } : undefined,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Create audio context for level monitoring
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.microphone = this.audioContext.createMediaStreamSource(this.stream);
            
            // Connect nodes
            this.microphone.connect(this.analyser);
            
            // Configure analyser
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.8;
            
            // Create data array for audio levels
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            
            // Start monitoring loop
            this.monitorAudioLevel(onAudioLevel);
            
            return true;
        } catch (error) {
            console.error('Failed to start audio monitoring:', error);
            throw error;
        }
    }

    /**
     * Monitor audio level and call callback
     */
    monitorAudioLevel(onAudioLevel) {
        const updateLevel = () => {
            if (!this.analyser || !this.dataArray) return;
            
            this.analyser.getByteFrequencyData(this.dataArray);
            
            // Calculate average volume (0-255)
            let sum = 0;
            for (let i = 0; i < this.dataArray.length; i++) {
                sum += this.dataArray[i];
            }
            const average = sum / this.dataArray.length;
            
            // Normalize to 0-100
            const level = Math.round((average / 255) * 100);
            
            onAudioLevel(level);
            
            requestAnimationFrame(updateLevel);
        };
        
        requestAnimationFrame(updateLevel);
    }

    /**
     * Stop audio monitoring
     */
    stopMonitoring() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.analyser = null;
        this.microphone = null;
        this.dataArray = null;
    }

    /**
     * Get current stream for speech recognition
     */
    getCurrentStream() {
        return this.stream;
    }
}

export default new AudioDeviceService();
