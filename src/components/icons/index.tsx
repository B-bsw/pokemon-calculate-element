'use client'

import bug from './bug.svg'
import dark from './dark.svg'
import dragon from './dragon.svg'
import electric from './electric.svg'
import fairy from './fairy.svg'
import fighting from './fighting.svg'
import fire from './fire.svg'
import flying from './flying.svg'
import ghost from './ghost.svg'
import grass from './grass.svg'
import ground from './ground.svg'
import ice from './ice.svg'
import normal from './normal.svg'
import poison from './poison.svg'
import psychic from './psychic.svg'
import rock from './rock.svg'
import steel from './steel.svg'
import water from './water.svg'
import Image from 'next/image'

const icons: Record<string, string> = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
}

export default function iconElements(element: string = 'bug') {
    return icons[element.toLowerCase()] ?? null
}

export const icon2TagSvg = (element: string = 'bug', size: number = 24) => {
    const src = icons[element.toLowerCase()]
    if (!src) return null

    return (
        <Image
            src={src}
            alt={element}
            width={size}
            height={size}
            className={`icon inline-block align-middle ${element.toLocaleLowerCase()}`}
        />
    )
}
