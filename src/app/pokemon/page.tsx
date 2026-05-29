'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Pokemon = dynamic(() => import('./Pokemon'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-1 py-8 md:py-4 w-full md:items-center items-start justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
    ),
})

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex flex-1 py-8 md:py-4 w-full md:items-center items-start justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                </div>
            }
        >
            <Pokemon />
        </Suspense>
    )
}

export default Page
