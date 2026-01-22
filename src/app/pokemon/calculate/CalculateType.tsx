'use client'

import { Key, useState, useMemo } from 'react'
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Tooltip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@heroui/react'
import poke from '@/libs/DataElement'
import iconElements, { icon2TagSvg } from '@/components/icons'
import { Minus, Plus, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import { useTranslate } from '@/i18n/i18nContext'

const CalculateType = () => {
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
    const hasTwoTypes = selectedTypes.length === 2

    // Count occurrences of each type in the lists
    const countOccurrences = (types: string[]) => {
        const countMap: Record<string, number> = {}
        types.forEach((type) => {
            countMap[type] = (countMap[type] || 0) + 1
        })
        return countMap
    }

    // Get types we're strong against (deal 2x/4x damage)
    const strongAgainstTypes = useMemo(() => {
        const allTypes = selectedTypes.flatMap((t) => t.strongAgainst)
        return countOccurrences(allTypes)
    }, [selectedTypes])

    // Get types we're weak to (take 2x/4x damage)
    const weakToTypes = useMemo(() => {
        const allTypes = selectedTypes.flatMap((t) => t.weakAgainst)
        return countOccurrences(allTypes)
    }, [selectedTypes])

    // Get types we resist (take 0.5x/0.25x damage)
    // A type resists attacks from types that it is strong against
    const resistantToTypes = useMemo(() => {
        const resistedTypes: string[] = []
        selectedTypes.forEach((selectedType) => {
            // Find all types that this type is strong against - we resist those
            poke.forEach((otherType) => {
                if (otherType.weakAgainst.includes(selectedType.name)) {
                    resistedTypes.push(otherType.name)
                }
            })
        })
        return countOccurrences(resistedTypes)
    }, [selectedTypes])

    // Get types that have no effect on us
    const noEffectTypes = useMemo(() => {
        return [...new Set(selectedTypes.flatMap((t) => t.noEffectFrom))]
    }, [selectedTypes])

    // Render multiplier text with colors
    const renderMultiplierList = (
        counts: Record<string, number>,
        multiplierBase: number, // 2 for strong/weak, 0.5 for resistant
        colorX1: string,
        colorX2: string
    ) => {
        const entries = Object.entries(counts)
        
        if (entries.length === 0) {
            return <span className="text-zinc-500">-</span>
        }

        return (
            <div className="flex flex-wrap gap-1">
                {entries.map(([typeName, count], index) => {
                    let colorClass = colorX1
                    let multiplierText = ''

                    if (multiplierBase >= 1) {
                        // For damage dealt (2x, 4x)
                        if (hasTwoTypes && count === 2) {
                            colorClass = colorX2
                            multiplierText = ' (x4)'
                        } else {
                            multiplierText = ' (x2)'
                        }
                    } else {
                        // For resistance (0.5x, 0.25x)
                        if (hasTwoTypes && count === 2) {
                            colorClass = colorX2
                            multiplierText = ' (x0.25)'
                        } else {
                            multiplierText = ' (x0.5)'
                        }
                    }

                    return (
                        <span key={typeName} className={colorClass}>
                            {t(typeName)}{multiplierText}
                            {index < entries.length - 1 && ', '}
                        </span>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4 pt-20">
            {/* Input Section */}
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 not-dark:border-zinc-700 not-dark:bg-zinc-800">
                    {count.map((_, index) => (
                        <Autocomplete
                            key={index}
                            label={t('SelectPokeElemental')}
                            size="sm"
                            className="w-full"
                            variant="bordered"
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

                    <div className="flex justify-center gap-2">
                        <Tooltip content={t('add')} delay={500}>
                            <Button
                                isIconOnly
                                isDisabled={count.length >= 2}
                                variant="flat"
                                size="sm"
                                onPress={handleAdd}
                            >
                                <Plus size={16} />
                            </Button>
                        </Tooltip>
                        <Tooltip content={t('delete')} color="danger" delay={500}>
                            <Button
                                isIconOnly
                                isDisabled={count.length <= 1}
                                color="danger"
                                variant="flat"
                                size="sm"
                                onPress={handleRemove}
                            >
                                <Minus size={16} />
                            </Button>
                        </Tooltip>
                        <Tooltip content={t('reset')} color="primary" delay={500}>
                            <Button
                                isIconOnly
                                color="primary"
                                variant="flat"
                                size="sm"
                                onPress={handleReset}
                            >
                                <RefreshCcw size={16} />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Result Table */}
            {dataInput[0].length > 1 && (
                <div className="w-full max-w-5xl overflow-x-auto">
                    <Table 
                        aria-label="Selected Pokémon element table"
                        classNames={{
                            th: 'text-sm text-center',
                            td: 'text-sm',
                        }}
                    >
                        <TableHeader>
                            <TableColumn>{t('elemental')}</TableColumn>
                            <TableColumn>{t('strong')} (x2, x4)</TableColumn>
                            <TableColumn>{t('weak')} (x2, x4)</TableColumn>
                            <TableColumn>{t('resistant')} (x0.5, x0.25)</TableColumn>
                            <TableColumn>{t('noEffectFrom')} (x0)</TableColumn>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        {selectedTypes.map((e) => (
                                            <div
                                                key={e.name}
                                                className="flex items-center gap-2"
                                            >
                                                <div className={`shrink-0 rounded p-1 ${e.name.toLowerCase()}`}>
                                                    <Image
                                                        src={iconElements(e.name)}
                                                        alt={e.name}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                                <span className="font-medium">
                                                    {t(e.name)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {renderMultiplierList(
                                        strongAgainstTypes,
                                        2,
                                        'text-yellow-500 font-medium',
                                        'text-red-500 font-semibold'
                                    )}
                                </TableCell>

                                <TableCell>
                                    {renderMultiplierList(
                                        weakToTypes,
                                        2,
                                        'text-yellow-500 font-medium',
                                        'text-red-500 font-semibold'
                                    )}
                                </TableCell>

                                <TableCell>
                                    {renderMultiplierList(
                                        resistantToTypes,
                                        0.5,
                                        'text-green-500 font-medium',
                                        'text-blue-500 font-semibold'
                                    )}
                                </TableCell>

                                <TableCell>
                                    {noEffectTypes.length > 0 ? (
                                        <span className="text-purple-500 font-semibold">
                                            {noEffectTypes.map((e) => t(e)).join(', ')} (x0)
                                        </span>
                                    ) : (
                                        <span className="text-zinc-500">-</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                    {/* Legend */}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500 not-dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded bg-yellow-500"></span>
                            x2
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded bg-red-500"></span>
                            x4
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded bg-green-500"></span>
                            x0.5
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded bg-blue-500"></span>
                            x0.25
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded bg-purple-500"></span>
                            x0
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CalculateType
