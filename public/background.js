/**
 * Background script for Voice Prompter
 * Opens the application in a dedicated popup window
 */

chrome.action.onClicked.addListener(() => {
    const appUrl = chrome.runtime.getURL('index.html');

    chrome.tabs.query({ url: appUrl }, (tabs) => {
        if (tabs.length > 0) {
            // 이미 열려있는 탭이 있다면 해당 탭으로 포커스 이동
            chrome.tabs.update(tabs[0].id, { active: true });
            chrome.windows.update(tabs[0].windowId, { focused: true });
        } else {
            // 현재 크롬 창에 새로운 탭으로 열기
            chrome.tabs.create({ url: 'index.html' });
        }
    });
});
