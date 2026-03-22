'use client'
import { useTranslate } from '@/i18n/i18nContext'
import Link from 'next/link'
import { List, Calculator, Table2, Swords, Backpack, Leaf } from 'lucide-react'

export default function Home() {
    const { t } = useTranslate()

    const itemList = [
        { id: 1, nameTrans: 'pokelist', path: '/pokemon', icon: List },
        { id: 2, nameTrans: 'movelist', path: '/moves', icon: Swords },
        { id: 3, nameTrans: 'heldItems', path: '/items', icon: Backpack },
        {
            id: 4,
            nameTrans: 'calem',
            path: '/pokemon/calculate',
            icon: Calculator,
        },
        {
            id: 5,
            nameTrans: 'tableem',
            path: '/pokemon/elements',
            icon: Table2,
        },
        { id: 6, nameTrans: 'nature', path: '/nature', icon: Leaf },
    ]

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 pt-24">
            <div className="w-full max-w-4xl">
                <div className="mb-10 flex items-center justify-center">
                    <div className='sm:text-4xl text-2xl'>POKEMON INFORMATION</div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
                    {itemList.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                href={item.path}
                                key={item.id}
                                className="group flex flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-600 p-10 transition-all duration-500 hover:border-zinc-200 hover:bg-zinc-50 not-dark:hover:border-zinc-800 not-dark:hover:bg-zinc-900/50 md:p-12"
                            >
                                <Icon
                                    strokeWidth={1}
                                    className="h-12 w-12 text-zinc-400 transition-all duration-500 not-dark:text-zinc-500 group-hover:scale-110 group-hover:text-zinc-900 not-dark:group-hover:text-zinc-100 md:h-16 md:w-16"
                                />
                                <span className="text-center text-sm font-light tracking-widest text-zinc-500 transition-colors not-dark:text-zinc-400 group-hover:text-zinc-900 not-dark:group-hover:text-zinc-100 md:text-base">
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
