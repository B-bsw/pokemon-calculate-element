'use client'
import TablePokemon from '@/components/table/TablePokemon'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <div className="flex h-screen items-center justify-center p-4">
                <div className="flex flex-col items-center gap-5">
                    <h1>Please Select</h1>
                    <div className="flex gap-5">
                        <Link href={'/pokemon/table'} className='border rounded-sm p-1 hover:bg-gray-200'>Table</Link>
                        <Link href={'/pokemon'} className='border rounded-sm p-1 hover:bg-gray-200'>Pokemon</Link>
                    </div>
                </div>
            </div>

        </>
    )
}
