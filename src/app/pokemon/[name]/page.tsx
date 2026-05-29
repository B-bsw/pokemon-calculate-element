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
            <div className="flex w-full flex-1 items-start justify-center py-8 md:items-center md:py-4">
                <PokemonDetail pokeName={name} />
            </div>
        </Suspense>
    )
}
