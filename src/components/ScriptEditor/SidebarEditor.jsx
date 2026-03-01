import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FileText, Upload, X, Download, Save } from 'lucide-react';
import { handleFileUpload, downloadTextFile } from '../../utils/fileHandler';
import useTranslation from '../../hooks/useTranslation';

const SidebarEditor = ({
    isOpen,
    scriptText,
    onChange,
    onClose,
    currentLanguage,
    // Typography matching props
    fontSize,
    letterSpacing,
    lineHeight,
    isSerif
}) => {
    const [editingText, setEditingText] = useState(scriptText);
    const textareaRef = useRef(null);
    const { t } = useTranslation(currentLanguage);

    // Sync from external changes if any, but mostly rely on internal state while open
    useEffect(() => {
        if (isOpen) {
            setEditingText(scriptText);
            // Auto-focus logic
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
            }, 100);
        }
    }, [isOpen]);

    // Handle debounced live update
    useEffect(() => {
        if (!isOpen) return;

        const timeoutId = setTimeout(() => {
            if (editingText !== scriptText) {
                onChange(editingText);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [editingText, isOpen, onChange, scriptText]);

    if (!isOpen) return null;

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const text = await handleFileUpload(file);
                setEditingText(text);
                onChange(text); // Force immediate update on file load
            } catch (error) {
                console.error('Failed to load file:', error);
            }
        }
    };

    const handleDownload = () => {
        downloadTextFile(editingText, 'script.txt');
    };

    return (
        <div className="w-1/3 min-w-[320px] max-w-lg bg-gray-900/80 backdrop-blur-xl border-l border-gray-700 shadow-2xl flex flex-col h-full z-40 transition-transform duration-300 ease-in-out transform translate-x-0 relative">
            <div className="px-4 py-3 border-b border-gray-700/50 flex justify-between items-center bg-gray-800/50">
                <h2 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" /> {t('editor.title')}
                </h2>
                <div className="flex gap-1.5">
                    <label className="flex items-center gap-1.5 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer text-xs transition-colors text-gray-300">
                        <Upload size={14} />
                        <span className="hidden xl:inline">{t('editor.import')}</span>
                        <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
                    </label>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors text-gray-300"
                        title={t('editor.download')}
                    >
                        <Download size={14} />
                    </button>
                    <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded text-gray-400 ml-1">
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-black/20">
                {/* Visual Guide line to match Prompter */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-yellow-500/10 pointer-events-none z-10" />

                <textarea
                    ref={textareaRef}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className={`absolute inset-0 w-full h-full p-8 bg-transparent text-gray-300 resize-none focus:outline-none focus:ring-0 text-center custom-scrollbar ${isSerif ? 'font-serif' : 'font-sans'}`}
                    style={{
                        fontSize: `${fontSize * 0.7}px`, // Scale down slightly to fit sidebar perfectly, or keep original
                        letterSpacing: `${letterSpacing}px`,
                        lineHeight: lineHeight,
                        paddingTop: '40vh',
                        paddingBottom: '40vh',
                    }}
                    placeholder={t('editor.placeholder')}
                />
            </div>

            <div className="px-4 py-3 border-t border-gray-700/50 bg-gray-800/50 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-medium">Live Sync Enabled</span>
                <button
                    onClick={onClose}
                    className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-md text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                    <Save size={14} /> {t('editor.apply')}
                </button>
            </div>
        </div>
    );
};

export default SidebarEditor;
