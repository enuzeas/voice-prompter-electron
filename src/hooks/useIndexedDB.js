import { useState, useEffect, useCallback } from 'react';
import { saveConfig, loadConfig } from '../services/indexedDB.service';

/**
 * Custom hook for IndexedDB persistence
 * Automatically saves and loads configuration
 */
const useIndexedDB = (initialConfig) => {
    const [config, setConfig] = useState(initialConfig);
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'

    // Load configuration on mount
    useEffect(() => {
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
    }, []);

    // Auto-save configuration with debounce
    useEffect(() => {
        if (isLoading) return; // Don't save during initial load

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
    }, [config, isLoading]);

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
