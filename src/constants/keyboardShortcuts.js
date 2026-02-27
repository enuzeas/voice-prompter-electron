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

    // Speed control
    SPEED_1: { key: '1', description: '속도 1' },
    SPEED_2: { key: '2', description: '속도 2' },
    SPEED_3: { key: '3', description: '속도 3' },
    SPEED_4: { key: '4', description: '속도 4' },
    SPEED_5: { key: '5', description: '속도 5' },
    SPEED_6: { key: '6', description: '속도 6' },
    SPEED_7: { key: '7', description: '속도 7' },
    SPEED_8: { key: '8', description: '속도 8' },
    SPEED_9: { key: '9', description: '속도 9' },
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
