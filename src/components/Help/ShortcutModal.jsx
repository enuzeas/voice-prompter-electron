import React, { useState, useEffect } from 'react';
import { X, Keyboard, CheckSquare, Square } from 'lucide-react';
import keyboardShortcuts from '../../constants/keyboardShortcuts';

const ShortcutModal = ({ isOpen, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem('hideShortcutModal', 'true');
        }
        onClose();
    };

    const categories = {
        '기본 조작': ['TOGGLE_PLAY', 'RESET'],
        '화면 제어': ['FULLSCREEN', 'PRESENTATION_MODE'],
        'UI 토글': ['OPEN_EDITOR', 'OPEN_SETTINGS', 'CLOSE_MODAL'],
        '파일 관리': ['SAVE_FILE', 'OPEN_FILE']
    };

    const getShortcutString = (shortcut) => {
        const parts = [];
        if (shortcut.ctrl) parts.push('Ctrl');
        if (shortcut.shift) parts.push('Shift');
        if (shortcut.alt) parts.push('Alt');

        let keyDisplay = shortcut.key.toUpperCase();
        if (keyDisplay === ' ') keyDisplay = 'Space';
        parts.push(keyDisplay);

        return parts.join(' + ');
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Keyboard className="text-blue-400" />
                        키보드 단축키 안내
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 grid md:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto">
                    {Object.entries(categories).map(([category, keys]) => (
                        <div key={category}>
                            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3 pb-1 border-b border-gray-700">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {keys.map(key => {
                                    const shortcut = keyboardShortcuts[key];
                                    if (!shortcut) return null;
                                    return (
                                        <li key={key} className="flex justify-between items-center group">
                                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                                {shortcut.description.split(' (')[0]}
                                            </span>
                                            <kbd className="bg-gray-900 text-gray-200 px-2 py-1 rounded border border-gray-600 font-mono text-xs shadow-sm whitespace-nowrap">
                                                {getShortcutString(shortcut)}
                                            </kbd>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-between items-center">
                    <button
                        onClick={() => setDontShowAgain(!dontShowAgain)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        {dontShowAgain ? <CheckSquare size={18} className="text-blue-500" /> : <Square size={18} />}
                        <span className="text-sm">다시 보지 않기</span>
                    </button>

                    <button
                        onClick={handleClose}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShortcutModal;
