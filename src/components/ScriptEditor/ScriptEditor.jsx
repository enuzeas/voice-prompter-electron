import React, { useState, useEffect, useRef } from 'react';
import { FileText, Upload, X, Check, Download } from 'lucide-react';
import { handleFileUpload, downloadTextFile } from '../../utils/fileHandler';

const ScriptEditor = ({ isOpen, scriptText, onSave, onClose }) => {
    const [editingText, setEditingText] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setEditingText(scriptText);
            // Auto-focus the textarea when editor opens
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    // Move cursor to end of text
                    textareaRef.current.setSelectionRange(
                        textareaRef.current.value.length,
                        textareaRef.current.value.length
                    );
                }
            }, 100);
        }
    }, [isOpen, scriptText]);

    if (!isOpen) return null;

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const text = await handleFileUpload(file);
                setEditingText(text);
            } catch (error) {
                console.error('Failed to load file:', error);
            }
        }
    };

    const handleSave = () => {
        onSave(editingText);
    };

    const handleDownload = () => {
        downloadTextFile(editingText, 'script.txt');
    };

    return (
        <div className="absolute left-0 right-0 top-0 bottom-0 pt-20 bg-gray-900/95 backdrop-blur-sm z-50 p-6 flex justify-center animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-gray-800 rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText size={18} className="text-blue-400" /> 대본 편집
                    </h2>
                    <div className="flex gap-2">
                        <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer text-sm transition-colors text-gray-300">
                            <Upload size={14} /> TXT 파일 불러오기
                            <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
                        </label>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors text-gray-300"
                            title="다운로드"
                        >
                            <Download size={14} />
                        </button>
                        <button onClick={onClose} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <textarea
                    ref={textareaRef}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 w-full p-6 bg-gray-900 text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg leading-relaxed font-mono"
                    placeholder="여기에 대본을 붙여넣거나 직접 작성하세요...

마크다운 사용 가능:
**굵게**, *기울임*, ~~취소선~~, __밑줄__"
                />

                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 font-medium"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg flex items-center gap-2"
                    >
                        <Check size={18} /> 적용하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScriptEditor;
