'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Moves = dynamic(() => import('./Moves'), {
    ssr: false,
    loading: () => (
        <div className="flex w-full flex-1 items-start justify-center py-8 md:items-center md:py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-zinc-900 dark:border-zinc-50"></div>
        </div>
    ),
})

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex w-full flex-1 items-start justify-center py-8 md:items-center md:py-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-zinc-900 dark:border-zinc-50"></div>
                </div>
            }
        >
            <Moves />
        </Suspense>
    )
}

export default Page
