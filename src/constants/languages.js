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
    }
];

export default languages;

export const getLanguageByCode = (code) => {
    return languages.find(lang => lang.code === code) || languages[0];
};
