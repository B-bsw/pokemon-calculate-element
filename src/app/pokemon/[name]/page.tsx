import { Suspense } from 'react'
import PokemonName from './pokemonName'

export default async function Page({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params

    return (
        <Suspense fallback={<>loading</>}>
            <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
                <PokemonName pokeName={name} />
            </div>
        </Suspense>
    )
}
