import en from './en.json';
import th from './th.json';

export type Locale = 'en' | 'th';

type Dictionary = Record<string, any>;

const resources: Record<Locale, Dictionary> = {
    en,
    th
};

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale) {
    currentLocale = locale;
    console.log(currentLocale)
}

export function t(key: string): string {
    return resources[currentLocale][key] ?? key;
}
