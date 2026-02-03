const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
    // Display information
    getDisplays: () => ipcRenderer.invoke('get-displays'),

    // Presentation mode sync
    syncPresentation: (data) => ipcRenderer.send('sync-presentation', data),
    onUpdatePresentation: (callback) => {
        ipcRenderer.on('update-presentation', (event, data) => callback(data));
    },

    // Shortcuts
    onShortcutReset: (callback) => {
        ipcRenderer.on('shortcut-reset', () => callback());
    },

    // Platform info
    platform: process.platform,

    // Check if running in Electron
    isElectron: true
});
