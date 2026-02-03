const { app, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = (createPresentationWindow, presentationWindow) => [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open Script...',
                accelerator: 'CommandOrControl+O',
                click: async (menuItem, browserWindow) => {
                    const result = await dialog.showOpenDialog(browserWindow, {
                        properties: ['openFile'],
                        filters: [
                            { name: 'Text Files', extensions: ['txt'] },
                            { name: 'All Files', extensions: ['*'] }
                        ]
                    });

                    if (!result.canceled && result.filePaths.length > 0) {
                        const content = fs.readFileSync(result.filePaths[0], 'utf-8');
                        browserWindow.webContents.send('load-script', content);
                    }
                }
            },
            {
                label: 'Save Script...',
                accelerator: 'CommandOrControl+S',
                click: async (menuItem, browserWindow) => {
                    browserWindow.webContents.send('save-script');
                }
            },
            { type: 'separator' },
            {
                label: 'Quit',
                accelerator: 'CommandOrControl+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { type: 'separator' },
            {
                label: 'Edit Script',
                accelerator: 'CommandOrControl+E',
                click: (menuItem, browserWindow) => {
                    browserWindow.webContents.send('toggle-script-editor');
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            {
                label: 'Toggle Fullscreen',
                accelerator: 'F11',
                click: (menuItem, browserWindow) => {
                    browserWindow.setFullScreen(!browserWindow.isFullScreen());
                }
            }
        ]
    },
    {
        label: 'Presentation',
        submenu: [
            {
                label: 'Start Presentation Mode',
                accelerator: 'CommandOrControl+Shift+P',
                click: () => {
                    createPresentationWindow();
                }
            },
            {
                label: 'Close Presentation',
                enabled: !!presentationWindow,
                click: () => {
                    if (presentationWindow) {
                        presentationWindow.close();
                    }
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Keyboard Shortcuts',
                click: (menuItem, browserWindow) => {
                    dialog.showMessageBox(browserWindow, {
                        type: 'info',
                        title: 'Keyboard Shortcuts',
                        message: 'Voice Prompter 단축키',
                        detail: `
Ctrl+R (Cmd+R): 리셋
Space: 재생/정지
Ctrl+E (Cmd+E): 대본 편집
Ctrl+, (Cmd+,): 설정
F11: 전체화면
Ctrl+Shift+P (Cmd+Shift+P): 프리젠테이션 모드
Escape: 모달 닫기
            `.trim()
                    });
                }
            },
            {
                label: 'About',
                click: (menuItem, browserWindow) => {
                    dialog.showMessageBox(browserWindow, {
                        type: 'info',
                        title: 'About Voice Prompter',
                        message: 'Voice Prompter v1.0.0',
                        detail: 'AI-powered voice recognition teleprompter\n\nBuilt with React, Electron, and Web Speech API'
                    });
                }
            }
        ]
    }
];
