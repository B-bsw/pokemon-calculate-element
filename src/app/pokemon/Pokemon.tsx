'use client'

import { Key, useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Button, Divider } from '@heroui/react'
import poke from '@/libs/DataElement'
import iconElements, { icon2TagSvg } from '@/components/icons'
import { Minus, Plus, RefreshCcw } from 'lucide-react'
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

    const handleReset = () => {
        setDataInput([''])
        setCount([0])
    }

    const selectedTypes = poke.filter((type) => dataInput.includes(type.name))

    const mergeUnique = (
        key: 'strongAgainst' | 'weakAgainst' | 'noEffectFrom',
    ) => {
        return [...new Set(selectedTypes.flatMap((t) => t[key]))]
    }

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
                        <Button
                            isIconOnly
                            color="primary"
                            disableRipple
                            onPress={handleReset}
                            className="rounded-full shadow-sm transition-transform hover:scale-105"
                        >
                            <RefreshCcw />
                        </Button>
                    </div>
                </div>
            </header>

            <section className="mt-6 w-full max-w-5xl">
                <div className="overflow-x-auto rounded-xl bg-white shadow-md">
                    {dataInput[0].length > 1 && (
                        <table className="w-full min-w-[600px] border-collapse text-sm text-zinc-800 md:text-base [&_td]:p-3 [&_td,th]:text-center [&_td]:align-middle">
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
                                    <td className="border-b border-zinc-200 border-r-transparent">
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

                                    <td>
                                        <div className="flex flex-col gap-4 text-start">
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

                                    <td>
                                        {mergeUnique('strongAgainst').join(
                                            ', ',
                                        )}
                                    </td>

                                    <td>
                                        {mergeUnique('weakAgainst').join(', ')}
                                    </td>

                                    <td>
                                        {mergeUnique('noEffectFrom').join(', ')}
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
