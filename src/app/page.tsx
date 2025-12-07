'use client'
import TablePokemon from '@/components/table/TablePokemon'
import { useTranslate } from '@/i18n/i18nContext'
import { Button } from '@heroui/react'
import Image from 'next/image'
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
            nameTrans: 'calem',
            path: '/pokemon/calculate',
        },
        {
            id: 3,
            nameTrans: 'tableem',
            path: '/pokemon/elements',
        },
    ]
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <div className="w-full max-w-md text-center px-5">
                    <div className="my-2 flex flex-col gap-5">
                        {itemList.map((item) => (
                            <Link href={item.path} key={item.id}>
                                <Button className='w-full' variant='solid'>{t(item.nameTrans)}</Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
