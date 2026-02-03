const { app, BrowserWindow, Menu, ipcMain, globalShortcut, screen } = require('electron');
const path = require('path');

let mainWindow = null;
let presentationWindow = null;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        backgroundColor: '#000000',
        title: 'Voice Prompter'
    });

    // Load the app
    // In development, load from Vite dev server
    const isDev = !app.isPackaged;
    const startUrl = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`;

    console.log('Loading URL:', startUrl);
    mainWindow.loadURL(startUrl);

    // Handle microphone permission requests
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
        const allowedPermissions = ['media', 'microphone', 'audioCapture'];

        if (allowedPermissions.includes(permission)) {
            callback(true); // Grant permission
            console.log(`Permission granted: ${permission}`);
        } else {
            callback(false); // Deny permission
            console.log(`Permission denied: ${permission}`);
        }
    });

    // Open DevTools in development
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (presentationWindow) {
            presentationWindow.close();
        }
    });
}

function createPresentationWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const displays = screen.getAllDisplays();

    // Find external display or use primary
    const externalDisplay = displays.find(display => display.id !== primaryDisplay.id);
    const targetDisplay = externalDisplay || primaryDisplay;

    if (presentationWindow) {
        presentationWindow.focus();
        return;
    }

    presentationWindow = new BrowserWindow({
        width: targetDisplay.bounds.width,
        height: targetDisplay.bounds.height,
        x: targetDisplay.bounds.x,
        y: targetDisplay.bounds.y,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        backgroundColor: '#000000',
        title: 'Voice Prompter - Presentation',
        parent: mainWindow,
        frame: false
    });

    const isDev = !app.isPackaged;
    const startUrl = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`;

    presentationWindow.loadURL(`${startUrl}?mode=presentation`);

    presentationWindow.on('closed', () => {
        presentationWindow = null;
    });
}

// App lifecycle
app.whenReady().then(() => {
    createMainWindow();

    // Set application menu
    const menuTemplate = require('./menu');
    const menu = Menu.buildFromTemplate(menuTemplate(createPresentationWindow, presentationWindow));
    Menu.setApplicationMenu(menu);

    // Global shortcuts
    globalShortcut.register('CommandOrControl+R', () => {
        if (mainWindow) {
            mainWindow.webContents.send('shortcut-reset');
        }
    });

    globalShortcut.register('F11', () => {
        if (mainWindow && mainWindow.isFocused()) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
    });

    globalShortcut.register('CommandOrControl+Shift+P', () => {
        createPresentationWindow();
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC handlers
ipcMain.handle('get-displays', () => {
    return screen.getAllDisplays().map(display => ({
        id: display.id,
        bounds: display.bounds,
        primary: display.id === screen.getPrimaryDisplay().id
    }));
});

ipcMain.on('sync-presentation', (event, data) => {
    if (presentationWindow) {
        presentationWindow.webContents.send('update-presentation', data);
    }
});
