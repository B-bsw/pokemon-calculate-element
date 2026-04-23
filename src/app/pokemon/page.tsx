'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Pokemon = dynamic(() => import('./Pokemon'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
    ),
})

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                </div>
            }
        >
            <Pokemon />
        </Suspense>
    )
}

export default Page
