const languages = [
    {
        code: 'ko-KR',
        name: '한국어',
        flag: '🇰🇷',
        speechCode: 'ko-KR'
    },
    {
        code: 'en-US',
        name: 'English',
        flag: '🇺🇸',
        speechCode: 'en-US'
    },
    {
        code: 'ja-JP',
        name: '日本語',
        flag: '🇯🇵',
        speechCode: 'ja-JP'
    },
    {
        code: 'zh-CN',
        name: '中文',
        flag: '🇨🇳',
        speechCode: 'zh-CN'
    },
    {
        code: 'es-ES',
        name: 'Español',
        flag: '🇪🇸',
        speechCode: 'es-ES'
    },
    {
        code: 'fr-FR',
        name: 'Français',
        flag: '🇫🇷',
        speechCode: 'fr-FR'
    },
    {
        code: 'de-DE',
        name: 'Deutsch',
        flag: '🇩🇪',
        speechCode: 'de-DE'
    },
    {
        code: 'it-IT',
        name: 'Italiano',
        flag: '🇮🇹',
        speechCode: 'it-IT'
    },
    {
        code: 'pt-BR',
        name: 'Português',
        flag: '🇧🇷',
        speechCode: 'pt-BR'
    },
    {
        code: 'ru-RU',
        name: 'Русский',
        flag: '🇷🇺',
        speechCode: 'ru-RU'
    },
    {
        code: 'vi-VN',
        name: 'Tiếng Việt',
        flag: '🇻🇳',
        speechCode: 'vi-VN'
    },
    {
        code: 'th-TH',
        name: 'ไทย',
        flag: '🇹🇭',
        speechCode: 'th-TH'
    },
    {
        code: 'id-ID',
        name: 'Bahasa Indonesia',
        flag: '🇮🇩',
        speechCode: 'id-ID'
    }
];

export default languages;

export const getLanguageByCode = (code) => {
    return languages.find(lang => lang.code === code) || languages[0];
};

export const getDefaultSystemLanguage = () => {
    if (typeof window === 'undefined' || !window.navigator) {
        return 'en-US';
    }

    const sysLang = window.navigator.language; // e.g. "ko-KR", "en-US", "ko"

    // First try exact match
    const exactMatch = languages.find(lang => lang.code === sysLang);
    if (exactMatch) return exactMatch.code;

    // Then try base language match (e.g. "ko" matches "ko-KR")
    const baseLang = sysLang.split('-')[0];
    const baseMatch = languages.find(lang => lang.code.startsWith(`${baseLang}-`));
    if (baseMatch) return baseMatch.code;

    // Default fallback
    return 'en-US';
};
