import React from 'react';
import { X, Shield, Info } from 'lucide-react';
import { version } from '../../../package.json';
import useTranslation from '../../hooks/useTranslation';

const AboutModal = ({ isOpen, onClose, currentLanguage }) => {
    const { t } = useTranslation(currentLanguage);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Info size={20} className="text-blue-400" />
                        {t('about.title')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-32 h-32 bg-gray-700 rounded-2xl mb-4 overflow-hidden border-4 border-gray-600 shadow-lg">
                            <img
                                src="/icons/icon512.png"
                                alt="Focus Prompter Icon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Focus Prompter</h1>
                        <p className="text-sm text-gray-400 font-mono bg-gray-900/50 px-3 py-1 rounded-full border border-gray-700">
                            v{version}
                        </p>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <Shield size={16} className="text-green-400" />
                            {t('about.privacyTitle')}
                        </h3>
                        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                            {t('about.privacyContent')}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors w-full"
                    >
                        {t('about.close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
