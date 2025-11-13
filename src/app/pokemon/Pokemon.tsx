'use client'

import { Key, useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Button, Divider } from '@heroui/react'
import poke from '@/libs/DataElement'
import iconElements, { icon2TagSvg } from '@/components/icons'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'

const Pokemon = () => {
    const [count, setCount] = useState<number[]>([0])
    const [dataInput, setDataInput] = useState<string[]>([''])

    const handleAdd = () => {
        if (count.length < 2) {
            setCount((prev) => [...prev, prev.length])
            setDataInput((prev) => [...prev, ''])
        }
    }

    const handleRemove = () => {
        if (count.length > 1) {
            setCount((prev) => prev.slice(0, -1))
            setDataInput((prev) => prev.slice(0, -1))
        }
    }

    const handleSelectChange = (key: Key | null, index: number) => {
        if (key) {
            setDataInput((prev) => {
                const newData = [...prev]
                newData[index] = key.toString()
                return newData
            })
        }
    }

    const selectedTypes = poke.filter((type) => dataInput.includes(type.name))

    // useEffect(() => {
    //     console.log('dataInput:', dataInput)
    // }, [dataInput])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-white to-zinc-50 p-4 md:p-8">
            <header className="w-full max-w-md">
                <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-md">
                    {count.map((_, index) => (
                        <Autocomplete
                            key={index}
                            label={`Select Pokémon Type ${index + 1}`}
                            size="sm"
                            className="w-full"
                            selectedKey={dataInput[index] || ''}
                            onSelectionChange={(key) =>
                                handleSelectChange(key, index)
                            }
                        >
                            {poke.map((e) => (
                                <AutocompleteItem
                                    key={e.name}
                                    startContent={icon2TagSvg(e.name, 20)}
                                >
                                    {e.name}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    ))}

                    <div className="mt-2 flex gap-3">
                        <Button
                            isIconOnly
                            isDisabled={count.length >= 2}
                            color="default"
                            disableRipple
                            onPress={handleAdd}
                            className="rounded-full shadow-sm transition-transform hover:scale-105"
                        >
                            <Plus />
                        </Button>
                        <Button
                            isIconOnly
                            isDisabled={count.length <= 1}
                            color="danger"
                            disableRipple
                            onPress={handleRemove}
                            className="rounded-full shadow-sm transition-transform hover:scale-105"
                        >
                            <Minus />
                        </Button>
                    </div>
                </div>
            </header>

            <section className="mt-6 w-full max-w-5xl">
                <div className="overflow-x-auto rounded-xl bg-white shadow-md">
                    {dataInput[0].length > 1 && (
                        <table className="w-full min-w-[600px] border-collapse text-sm text-zinc-800 md:text-base">
                            <thead className="bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-700">
                                <tr>
                                    <th
                                        colSpan={2}
                                        className="border-b border-zinc-300 p-3 text-left font-semibold"
                                    >
                                        Element
                                    </th>
                                    <th className="border-b border-zinc-300 p-3 text-left font-semibold">
                                        Strong
                                    </th>
                                    <th className="border-b border-zinc-300 p-3 text-left font-semibold">
                                        Weak
                                    </th>
                                    <th className="border-b border-zinc-300 p-3 text-left font-semibold">
                                        No Effect From
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="align-top transition-colors hover:bg-zinc-50">
                                    <td className="border-b border-zinc-200 border-r-transparent p-3">
                                        <div className="flex flex-col items-center gap-2">
                                            {selectedTypes.map((e) => (
                                                <Image
                                                    key={e.name}
                                                    src={iconElements(e.name)}
                                                    alt={e.name}
                                                    width={30}
                                                    height={30}
                                                    className={`icon rounded-md ${e.name.toLocaleLowerCase()}`}
                                                />
                                            ))}
                                        </div>
                                    </td>

                                    <td className="border-b border-zinc-200 p-3">
                                        <div className="flex flex-col gap-4">
                                            {selectedTypes.map((e) => (
                                                <div
                                                    key={e.name}
                                                    className="font-medium"
                                                >
                                                    {e.name}
                                                </div>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="border-b border-zinc-200 p-3">
                                        {selectedTypes.map((e) => (
                                            <div key={`${e.name}-strong`}>
                                                {e.strongAgainst.join(', ')}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="border-b border-zinc-200 p-3">
                                        {selectedTypes.map((e) => (
                                            <div key={`${e.name}-weak`}>
                                                {e.weakAgainst.join(', ')}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="border-b border-zinc-200 p-3">
                                        {selectedTypes.map((e) => (
                                            <div key={`${e.name}-noeffect`}>
                                                {e.noEffectFrom.join(', ')}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Pokemon
