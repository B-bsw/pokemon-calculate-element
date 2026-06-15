'use client'
import { useTranslate } from '@/i18n/i18nContext'
import { items } from '@/utils/itemIconList'
import Link from 'next/link'

export default function Home() {
    const { t } = useTranslate()

    return (
        <div className="flex w-full flex-1 items-center justify-center p-4 py-8">
            <div className="w-full max-w-4xl">
                <div className="mb-10 flex items-center justify-center">
                    <div className="text-2xl sm:text-4xl">
                        POKEMON INFORMATION
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
                    {items.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                href={item.path}
                                key={item.id}
                                className="group flex flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-600 p-10 transition-all duration-500 hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/50 md:p-12"
                            >
                                <Icon
                                    strokeWidth={1}
                                    className="h-12 w-12 text-zinc-400 transition-all duration-500 dark:text-zinc-500 group-hover:scale-110 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 md:h-16 md:w-16"
                                />
                                <span className="text-center text-sm font-light tracking-widest text-zinc-500 transition-colors dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 md:text-base">
                                    {t(item.nameTrans).toUpperCase()}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
