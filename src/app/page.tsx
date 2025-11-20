'use client'
import TablePokemon from '@/components/table/TablePokemon'
import { useTranslate } from '@/i18n/i18nContext'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    const { t } = useTranslate()
    return (
        <>
            <div className="flex h-[50vh] items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <div className="my-2 flex flex-col gap-5">
                        <Link
                            href={'/pokemon'}
                            className="rounded-sm border p-1 transition-all hover:bg-gray-200 not-dark:hover:bg-zinc-700"
                        >
                            {t('pokelist')}
                        </Link>
                        <Link
                            href={'/pokemon/calculate'}
                            className="rounded-sm border p-1 transition-all hover:bg-gray-200 not-dark:hover:bg-zinc-700"
                        >
                            {t('calem')}
                        </Link>
                        <Link
                            href={'/pokemon/elements'}
                            className="rounded-sm border p-1 transition-all hover:bg-gray-200 not-dark:hover:bg-zinc-700"
                        >
                            {t('tableem')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
