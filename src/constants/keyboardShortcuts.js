const keyboardShortcuts = {
    // Prompter controls
    RESET: { key: 'r', ctrl: true, description: '프롬프터 리셋' },
    TOGGLE_PLAY: { key: ' ', description: '재생/정지 토글 (Space)' },

    // UI toggles
    OPEN_EDITOR: { key: 'e', ctrl: true, description: '대본 편집 열기' },
    OPEN_SETTINGS: { key: ',', ctrl: true, description: '설정 열기' },
    CLOSE_MODAL: { key: 'Escape', description: '모달 닫기' },

    // Window controls
    FULLSCREEN: { key: 'F11', description: '전체화면 토글' },
    PRESENTATION_MODE: { key: 'p', ctrl: true, shift: true, description: '프리젠테이션 모드' },

    // File operations
    OPEN_FILE: { key: 'o', ctrl: true, description: '파일 열기' },
    SAVE_FILE: { key: 's', ctrl: true, description: '파일 저장' },
};

export default keyboardShortcuts;

// Helper function to check if shortcut matches event
export const matchesShortcut = (event, shortcut) => {
    const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
    const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
    const altMatch = shortcut.alt ? event.altKey : !event.altKey;
    const keyMatch = event.key === shortcut.key || event.key === shortcut.key.toUpperCase();

    return ctrlMatch && shiftMatch && altMatch && keyMatch;
};
