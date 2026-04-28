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
            <div className="flex h-full w-full items-center justify-center">
                <PokemonDetail pokeName={name} />
            </div>
        </Suspense>
    )
}
