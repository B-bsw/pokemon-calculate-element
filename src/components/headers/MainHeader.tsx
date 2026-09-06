'use client'

import { useTranslate } from '@/i18n/i18nContext'
import { items } from '@/utils/itemIconList'
import useDarkMode from '@/hooks/useDarkMode'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainHeader = () => {
    const path = usePathname()
    const { theme, setTheme } = useDarkMode()
    const { t, lang, setLang } = useTranslate()
    const isDarkMode = theme === 'dark'

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-[#151515] bg-[#f7f1df] text-[#151515] dark:border-[#f7f1df] dark:bg-[#151515] dark:text-[#f7f1df]">
            <div className="flex h-20 items-stretch">
                <Link
                    href="/"
                    aria-label="Pokémon Info home"
                    className="flex shrink-0 items-center border-r-4 border-current bg-[#ff3b30] px-4 text-xl font-black tracking-[-0.06em] text-[#151515] uppercase sm:px-6 sm:text-2xl"
                >
                    PKMN<span className="hidden sm:inline">.INFO</span>
                </Link>

                <nav
                    className="scll flex min-w-0 flex-1 overflow-x-auto"
                    aria-label="Main navigation"
                >
                    {items.map((item, index) => {
                        const active =
                            path === item.path ||
                            path.startsWith(`${item.path}/`)
                        return (
                            <Link
                                key={item.id}
                                href={item.path}
                                className={`flex shrink-0 items-center gap-2 border-r-2 border-current px-4 font-mono text-xs font-black uppercase transition-colors sm:text-sm ${active ? 'bg-[#ffcc33] text-[#151515]' : 'hover:bg-[#b9f227] hover:text-[#151515]'}`}
                            >
                                <span className="opacity-60">0{index + 1}</span>
                                {t(item.nameTrans)}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex shrink-0 items-stretch border-l-2 border-current">
                    <button
                        type="button"
                        aria-label={
                            isDarkMode ? 'Use light mode' : 'Use dark mode'
                        }
                        onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                        className="grid w-12 place-items-center border-r-2 border-current transition-colors hover:bg-[#5b7cfa] hover:text-[#151515] sm:w-16"
                    >
                        {isDarkMode ? (
                            <Sun size={22} strokeWidth={3} />
                        ) : (
                            <Moon size={22} strokeWidth={3} />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                        className="w-12 font-mono text-xs font-black uppercase transition-colors hover:bg-[#ff8ed4] hover:text-[#151515] sm:w-16 sm:text-sm"
                        aria-label="Change language"
                    >
                        {lang}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default MainHeader
