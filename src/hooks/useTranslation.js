
import { useCallback } from 'react';
import { translations } from '../translations';

const useTranslation = (currentLanguage) => {
    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        // Fallback to English if not found, then key itself
        if (!value) {
            let fallback = translations['en-US'];
            for (const k of keys) {
                fallback = fallback?.[k];
            }
            return fallback || key;
        }

        return value;
    }, [currentLanguage]);

    return { t };
};

export default useTranslation;
