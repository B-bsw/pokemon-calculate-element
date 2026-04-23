'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Moves = dynamic(() => import('./Moves'), {
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
            <Moves />
        </Suspense>
    )
}

export default Page
