'use client'

import { Key, useEffect, useState } from 'react'
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Divider,
    Tooltip,
} from '@heroui/react'
import poke from '@/libs/DataElement'
import iconElements, { icon2TagSvg } from '@/components/icons'
import { Minus, Plus, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import { useTranslate } from '@/i18n/i18nContext'

const Pokemon = () => {
    const [count, setCount] = useState<number[]>([0])
    const [dataInput, setDataInput] = useState<string[]>([''])

    const { t } = useTranslate()

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
        const merge = [...new Set(selectedTypes.flatMap((t) => t[key]))]
        return merge.length === 0 ? [...new Set('-')] : merge
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-white to-zinc-50 p-4 md:p-8">
            <header className="w-full max-w-md">
                <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-md">
                    {count.map((_, index) => (
                        <Autocomplete
                            key={index}
                            label={t('Select Pokémon Element')}
                            size="sm"
                            className="w-full"
                            variant="underlined"
                            labelPlacement="outside"
                            color="primary"
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
                                    {t(e.name)}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    ))}

                    <div className="mt-2 flex gap-3">
                        <Tooltip
                            content="add"
                            color="default"
                            delay={1000}
                            closeDelay={0}
                        >
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
                        </Tooltip>
                        <Tooltip
                            content="delete"
                            color="danger"
                            delay={1000}
                            closeDelay={0}
                        >
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
                        </Tooltip>
                        <Tooltip
                            content="reset"
                            color="primary"
                            delay={1000}
                            closeDelay={0}
                        >
                            <Button
                                isIconOnly
                                color="primary"
                                disableRipple
                                onPress={handleReset}
                                className="rounded-full shadow-sm transition-transform hover:scale-105"
                            >
                                <RefreshCcw />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </header>

            <section className="mt-6 w-full max-w-5xl">
                <div className="overflow-x-auto rounded-xl bg-white shadow-md">
                    {dataInput[0].length > 1 && (
                        <table className="w-full min-w-[600px] border-collapse text-sm text-zinc-800 md:text-base [&_td]:p-3 [&_td]:align-middle [&_td,th]:text-center">
                            <thead className="bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-700">
                                <tr>
                                    <th
                                        colSpan={2}
                                        className="border-b border-zinc-300 p-3 text-left font-semibold"
                                    >
                                        {t('element')}
                                    </th>
                                    <th className="border-b border-zinc-300 p-3 text-left font-semibold">
                                        {t('strong')}
                                    </th>
                                    <th className="border-b border-zinc-300 p-3 text-left font-semibold">
                                        {t('weak')}
                                    </th>
                                    <th className="border-b border-zinc-300 p-3 text-left font-semibold">
                                        {t('noEffectFrom')}
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
                                                    {t(e.name)}
                                                </div>
                                            ))}
                                        </div>
                                    </td>

                                    <td>
                                        {mergeUnique('strongAgainst')
                                            .map((e) => t(e))
                                            .join(' - ')}
                                    </td>

                                    <td>
                                        {mergeUnique('weakAgainst')
                                            .map((e) => t(e))
                                            .join(' - ')}
                                    </td>

                                    <td>
                                        {mergeUnique('noEffectFrom')
                                            .map((e) => t(e))
                                            .join(' - ')}
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
