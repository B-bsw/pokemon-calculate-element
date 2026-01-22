'use client'
import { useTranslate } from '@/i18n/i18nContext'
import { Button } from '@heroui/react'
import Link from 'next/link'

export default function Home() {
    const { t } = useTranslate()
    const itemList = [
        {
            id: 1,
            nameTrans: 'pokelist',
            path: '/pokemon',
        },
        {
            id: 2,
            nameTrans: 'movelist',
            path: '/moves',
        },
        {
            id: 3,
            nameTrans: 'calem',
            path: '/pokemon/calculate',
        },
        {
            id: 4,
            nameTrans: 'tableem',
            path: '/pokemon/elements',
        },
    ]
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 pt-20">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-3">
                    {itemList.map((item) => (
                        <Link href={item.path} key={item.id}>
                            <Button
                                className="w-full text-zinc-800 not-dark:text-white"
                                variant="ghost"
                                color="primary"
                                size="lg"
                            >
                                {t(item.nameTrans)}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
