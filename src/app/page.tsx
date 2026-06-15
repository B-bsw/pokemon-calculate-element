'use client'
import { useTranslate } from '@/i18n/i18nContext'
import { items } from '@/utils/itemIconList'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
    const { t } = useTranslate()

    return (
        <div className="flex min-h-[calc(100dvh-4rem)] w-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
            {/* Hero */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
                <div className="mb-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl uppercase">
                    POKEMON INFO
                </div>
                <div className="mb-14 text-center text-sm font-semibold tracking-widest text-zinc-500 sm:text-base uppercase">
                    Explore the universe
                </div>

                <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                href={item.path}
                                key={item.id}
                                className="group flex items-center justify-between gap-4 rounded-xl border-2 border-zinc-900 bg-zinc-50 p-6 transition-all hover:bg-zinc-900 hover:text-zinc-50 dark:border-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 sm:p-8"
                            >
                                <div className="flex flex-col gap-3">
                                    <Icon
                                        strokeWidth={2}
                                        className="h-10 w-10 text-zinc-900 group-hover:text-zinc-50 dark:text-zinc-50 dark:group-hover:text-zinc-900 transition-colors"
                                    />
                                    <span className="text-left text-lg font-bold uppercase">
                                        {t(item.nameTrans)}
                                    </span>
                                </div>
                                <div className="rounded-full border-2 border-zinc-900 p-2 group-hover:border-zinc-50 dark:border-zinc-50 dark:group-hover:border-zinc-900 transition-colors">
                                    <ArrowRight className="h-5 w-5 text-zinc-900 group-hover:text-zinc-50 dark:text-zinc-50 dark:group-hover:text-zinc-900 transition-colors" />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            <div className="py-6 text-center text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                © 2026 POKEMON INFO
            </div>
        </div>
    )
}
