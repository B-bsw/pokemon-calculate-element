'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from './en.json';
import th from './th.json';

export type Locale = 'en' | 'th';
type Dictionary = Record<string, any>;

const resources: Record<Locale, Dictionary> = { en, th };

const LANG_STORAGE_KEY = 'pokemon-app-lang';

type I18nContextType = {
  lang: Locale;
  t: (key: string) => string;
  setLang: (lang: Locale) => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

// Get initial language from localStorage or default to 'th'
const getInitialLang = (): Locale => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'th') {
      return stored;
    }
  }
  return 'th'; // Default to Thai
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>('th');
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'th') {
      setLangState(stored);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when language changes
  const setLang = (newLang: Locale) => {
    setLangState(newLang);
    localStorage.setItem(LANG_STORAGE_KEY, newLang);
  };

  const t = (key: string) => resources[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslate() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslate must be used within I18nProvider');
  return ctx;
}
