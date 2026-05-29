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
            <div className="flex flex-1 py-8 md:py-4 w-full md:items-center items-start justify-center">
                <PokemonDetail pokeName={name} />
            </div>
        </Suspense>
    )
}
