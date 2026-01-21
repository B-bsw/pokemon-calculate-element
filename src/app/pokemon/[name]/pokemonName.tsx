'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

type PokemonData = {
    abilities: [
        {
            ability: {
                name: string
                url: string
            }
            is_hidden: boolean
            slot: number
        },
    ]
    id: number
    moves: [
        {
            move: {
                name: string
                url: string
            }
        },
    ]
    sprites: {
        front_default: string
        dream_world: {
            front_default: string
        }
    }
    stats: [
        {
            base_stat: number
            effort: number
            stat: {
                name: string
                url: string
            }
        },
    ]
    types: [
        {
            slot: number
            type: {
                name: string
                url: string
            }
        },
    ]
}

export default function PokemonName({
    pokeName = 'none',
}: {
    pokeName: string
}) {
    const [pokemonName, setPokemonName] = useState('')
    const fetchPokeData = async () => {
        try {
            const dataPokemon = (
                await axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
            ).data
            console.log(dataPokemon)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchPokeData()
    }, [])
    return (
        <>
            <div className="">{pokeName}</div>
            <div></div>
        </>
    )
}
