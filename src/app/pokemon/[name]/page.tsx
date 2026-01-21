import { Suspense } from 'react'
import PokemonDetail from './pokemonDetail'

export default async function Page({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params

    return (
        <Suspense fallback={<>loading</>}>
            <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
                <PokemonDetail pokeName={name} />
            </div>
        </Suspense>
    )
}
