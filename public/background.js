/**
 * Background script for Voice Prompter
 * Opens the application in a dedicated popup window
 */

chrome.action.onClicked.addListener(() => {
    // Check if window already exists
    chrome.windows.getAll({ populate: true, windowTypes: ['popup'] }, (windows) => {
        const existingWindow = windows.find(w =>
            w.tabs.some(t => t.url.includes('index.html'))
        );

        if (existingWindow) {
            // Focus existing window
            chrome.windows.update(existingWindow.id, { focused: true });
        } else {
            // Create new window
            // Width/Height slightly larger to accommodate UI comfortably
            chrome.windows.create({
                url: 'index.html',
                type: 'popup',
                width: 500,
                height: 800,
                focused: true
            });
        }
    });
});
