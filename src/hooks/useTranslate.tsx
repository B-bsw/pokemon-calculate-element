'use client';

import { useState, useEffect } from 'react';
import { t as translate, setLocale, Locale } from '@/i18n';

export function useTranslate() {
    const [lang, setLang] = useState<Locale>('en');

    useEffect(() => {
        setLocale(lang);
    }, [lang]);

    function changeLang(key: any) {
        const value = key.toString() as Locale;
        setLang(value);
    }

    return {
        t: translate,
        lang,
        setLang: changeLang,
    };
}
