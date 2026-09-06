'use client'

import { useTranslate } from '@/i18n/i18nContext'
import { items } from '@/utils/itemIconList'
import Link from 'next/link'
import { ArrowDownRight, Asterisk } from 'lucide-react'

const accents = [
    'bg-[#ff5b45]',
    'bg-[#5b7cfa]',
    'bg-[#b9f227]',
    'bg-[#ff8ed4]',
    'bg-[#ffcc33]',
    'bg-[#67d9e8]',
]

export default function Home() {
    const { t } = useTranslate()

    return (
        <main className="brutal-grid min-h-[calc(100dvh-5rem)] text-[#151515] dark:text-[#f7f1df]">
            <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mb-8 grid items-end gap-6 border-b-4 border-current pb-8 lg:grid-cols-[1fr_auto]">
                    <div>
                        <div className="mb-5 flex items-center gap-2 font-mono text-xs font-black tracking-[0.2em] uppercase sm:text-sm">
                            <span className="inline-block h-3 w-3 animate-pulse bg-[#ff3b30] ring-2 ring-current" />
                            Field database / Gen 01—09
                        </div>
                        <h1 className="max-w-5xl text-[clamp(4rem,13vw,10rem)] leading-[0.72] font-black tracking-[-0.085em] uppercase">
                            Poké<span className="text-[#ff3b30]">dex</span>
                        </h1>
                    </div>
                    <div className="brutal-shadow hidden rotate-2 border-4 border-[#151515] bg-[#ffcc33] p-5 text-[#151515] lg:block">
                        <Asterisk size={52} strokeWidth={3} />
                        <p className="mt-4 max-w-44 font-mono text-xs leading-tight font-black uppercase">
                            All the stats. Zero decorative nonsense.
                        </p>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between gap-4 font-mono text-xs font-black tracking-widest uppercase">
                    <span>Select a dataset</span>
                    <span>06 modules</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Link
                                href={item.path}
                                key={item.id}
                                className={`brutal-card group relative flex min-h-52 flex-col justify-between overflow-hidden border-4 border-[#151515] p-5 text-[#151515] ${accents[index]}`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-sm font-black">
                                        /0{index + 1}
                                    </span>
                                    <Icon size={42} strokeWidth={2.5} />
                                </div>
                                <div className="flex items-end justify-between gap-4">
                                    <h2 className="max-w-[80%] text-3xl leading-none font-black tracking-[-0.05em] uppercase sm:text-4xl">
                                        {t(item.nameTrans)}
                                    </h2>
                                    <ArrowDownRight
                                        className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                                        size={34}
                                        strokeWidth={3}
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <footer className="mt-10 flex flex-wrap justify-between gap-3 border-t-4 border-current pt-4 font-mono text-xs font-black uppercase">
                    <span>© 2026 Pokémon Info</span>
                    <span>Built for trainers // Bangkok</span>
                </footer>
            </section>
        </main>
    )
}
