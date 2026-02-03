import { openDB } from 'idb';

const DB_NAME = 'voice-prompter-db';
const DB_VERSION = 1;
const STORE_NAME = 'config';

/**
 * Initialize IndexedDB
 */
const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });
};

/**
 * Save configuration to IndexedDB
 */
export const saveConfig = async (config) => {
    try {
        const db = await initDB();
        await db.put(STORE_NAME, {
            ...config,
            updatedAt: new Date().toISOString()
        }, 'user_settings');
        return true;
    } catch (error) {
        console.error('Error saving config:', error);
        return false;
    }
};

/**
 * Load configuration from IndexedDB
 */
export const loadConfig = async () => {
    try {
        const db = await initDB();
        const config = await db.get(STORE_NAME, 'user_settings');
        return config || null;
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
};

/**
 * Clear all data from IndexedDB
 */
export const clearConfig = async () => {
    try {
        const db = await initDB();
        await db.delete(STORE_NAME, 'user_settings');
        return true;
    } catch (error) {
        console.error('Error clearing config:', error);
        return false;
    }
};

export default {
    saveConfig,
    loadConfig,
    clearConfig
};
