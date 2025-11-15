'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import en from './en.json';
import th from './th.json';

export type Locale = 'en' | 'th';
type Dictionary = Record<string, any>;

const resources: Record<Locale, Dictionary> = { en, th };

type I18nContextType = {
  lang: Locale;
  t: (key: string) => string;
  setLang: (lang: Locale) => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>('en');

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
