import { useState, useEffect, useCallback } from 'react';
import { saveConfig, loadConfig } from '../services/indexedDB.service';

/**
 * Custom hook for IndexedDB persistence
 * Automatically saves and loads configuration
 */
const useIndexedDB = (initialConfig, isPresentationWindow = false) => {
    const [config, setConfig] = useState(() => {
        if (isPresentationWindow) {
            try {
                // Synchronously initialize from localStorage to prevent race conditions
                const savedSettings = localStorage.getItem('presentation-settings');
                const savedScript = localStorage.getItem('presentation-script');

                let mergedConfig = { ...initialConfig };
                if (savedSettings) {
                    mergedConfig = { ...mergedConfig, ...JSON.parse(savedSettings) };
                }
                if (savedScript) {
                    mergedConfig.scriptText = JSON.parse(savedScript);
                }
                return mergedConfig;
            } catch (e) {
                console.error('Failed to parse presentation settings:', e);
            }
        }
        return initialConfig;
    });
    const [isLoading, setIsLoading] = useState(!isPresentationWindow); // No loading required for presentation
    const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'

    // Load configuration on mount (Operator only)
    useEffect(() => {
        if (isPresentationWindow) return; // Bypass for presentation

        const loadData = async () => {
            setIsLoading(true);
            try {
                const savedConfig = await loadConfig();
                if (savedConfig) {
                    setConfig(savedConfig);
                }
            } catch (error) {
                console.error('Failed to load config:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [isPresentationWindow]);

    // Auto-save configuration with debounce (Operator only)
    useEffect(() => {
        if (isPresentationWindow || isLoading) return; // Don't save for presentation or during initial load

        setSaveStatus('saving');
        const timer = setTimeout(async () => {
            try {
                const success = await saveConfig(config);
                setSaveStatus(success ? 'saved' : 'error');
            } catch (error) {
                console.error('Failed to save config:', error);
                setSaveStatus('error');
            }
        }, 1000); // 1 second debounce

        return () => clearTimeout(timer);
    }, [config, isLoading, isPresentationWindow]);

    // Update configuration
    const updateConfig = useCallback((updates) => {
        setConfig(prev => ({ ...prev, ...updates }));
    }, []);

    return {
        config,
        updateConfig,
        isLoading,
        saveStatus
    };
};

export default useIndexedDB;
