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

    // Get types we're strong against (Offensive Coverage)
    // For coverage, we just want to know what types we hit Super Effectively with ANY of our types.
    const strongAgainstTypes = useMemo(() => {
        const result: Record<string, number> = {}
        const allStrong = new Set<string>()

        selectedTypes.forEach((t) => {
            t.strongAgainst.forEach((s) => allStrong.add(s))
        })

        // Map to count 1 for the renderer (implies x2 in the generic renderer, but we will customize label)
        allStrong.forEach((type) => {
            result[type] = 1
        })

        return result
    }, [selectedTypes])

    // Calculate defensive effectiveness (Weakness, Resistance, Immunity)
    const defensiveEffectiveness = useMemo(() => {
        const effectiveness: Record<string, number> = {}

        // Initialize all types with 1x multiplier
        poke.forEach((type) => {
            effectiveness[type.name] = 1
        })

        // Iterate through all 18 types as "Attacking Types"
        poke.forEach((attackingType) => {
            let multiplier = 1

            selectedTypes.forEach((defendingType) => {
                // Check weakness (x2)
                if (defendingType.weakAgainst.includes(attackingType.name)) {
                    multiplier *= 2
                }
                // Check resistance (x0.5)
                else if (defendingType.resists?.includes(attackingType.name)) {
                    multiplier *= 0.5
                }
                // Check immunity (x0)
                else if (
                    defendingType.noEffectFrom.includes(attackingType.name)
                ) {
                    multiplier *= 0
                }
            })

            effectiveness[attackingType.name] = multiplier
        })

        return effectiveness
    }, [selectedTypes])

    // Get types we're weak to (take 2x/4x damage)
    const weakToTypes = useMemo(() => {
        const result: Record<string, number> = {}
        Object.entries(defensiveEffectiveness).forEach(([type, mult]) => {
            if (mult > 1) {
                result[type] = mult === 4 ? 2 : 1
            }
        })
        return result
    }, [defensiveEffectiveness])

    // Get types we resist (take 0.5x/0.25x damage)
    const resistantToTypes = useMemo(() => {
        const result: Record<string, number> = {}
        Object.entries(defensiveEffectiveness).forEach(([type, mult]) => {
            if (mult < 1 && mult > 0) {
                result[type] = mult === 0.25 ? 2 : 1
            }
        })
        return result
    }, [defensiveEffectiveness])

    // Get types that have no effect on us
    const noEffectTypes = useMemo(() => {
        return Object.keys(defensiveEffectiveness).filter(
            (type) => defensiveEffectiveness[type] === 0
        )
    }, [defensiveEffectiveness])

    // Render multiplier text with colors
    const renderMultiplierList = (
        counts: Record<string, number>,
        multiplierBase: number, // 2 for strong/weak, 0.5 for resistant
        colorX1: string,
        colorX2: string,
        isOffensive: boolean = false
    ) => {
        const entries = Object.entries(counts)

        if (entries.length === 0) {
            return <span className="text-zinc-500">-</span>
        }

        return (
            <div className="flex flex-wrap gap-2">
                {entries.map(([typeName, count]) => {
                    let colorClass = colorX1
                    let multiplierText = ''

                    if (isOffensive) {
                        // Offensive only has x2 (Effective) in this simplified view
                        multiplierText = ' (x2)'
                    } else {
                        if (multiplierBase >= 1) {
                            // For damage dealt (2x, 4x)
                            if (count === 2) {
                                colorClass = colorX2
                                multiplierText = ' (x4)'
                            } else {
                                multiplierText = ' (x2)'
                            }
                        } else {
                            // For resistance (0.5x, 0.25x)
                            if (count === 2) {
                                colorClass = colorX2
                                multiplierText = ' (x0.25)'
                            } else {
                                multiplierText = ' (x0.5)'
                            }
                        }
                    }

                    return (
                        <div
                            key={typeName}
                            className={`flex items-center gap-1 rounded-full border px-2 py-1 text-sm ${colorClass} bg-opacity-10 border-current bg-current`}
                        >
                            <Image
                                src={iconElements(typeName)}
                                alt={typeName}
                                width={16}
                                height={16}
                            />
                            <span>
                                {t(typeName)}
                                {multiplierText}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4 pt-20">
            {/* Input Section */}
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-md not-dark:border-zinc-900 not-dark:bg-zinc-900">
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
                        <Tooltip
                            content={t('delete')}
                            color="danger"
                            delay={500}
                        >
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
                        <Tooltip
                            content={t('reset')}
                            color="primary"
                            delay={500}
                        >
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

            {/* Results Section */}
            {dataInput[0].length > 1 && (
                <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2">
                    {/* Attacking Card */}
                    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-md not-dark:border-zinc-900 not-dark:bg-zinc-900">
                        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 not-dark:border-zinc-800">
                            <h2 className="text-lg font-bold text-red-500">
                                {t('attacking')}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-zinc-500">
                                {t('strong')} (x2)
                            </span>
                            {renderMultiplierList(
                                strongAgainstTypes,
                                2,
                                'text-white bg-red-500 not-dark:bg-red-500/80 border-0',
                                'text-white bg-red-500 not-dark:bg-red-500/80 border-0',
                                true
                            )}
                        </div>
                    </div>

                    {/* Defending Card */}
                    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-md not-dark:border-zinc-900 not-dark:bg-zinc-900">
                        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 not-dark:border-zinc-800">
                            <h2 className="text-lg font-bold text-blue-500">
                                {t('defending')}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-zinc-500">
                                    {t('weak')} (x2, x4)
                                </span>
                                {renderMultiplierList(
                                    weakToTypes,
                                    2,
                                    'text-white bg-yellow-500/90 not-dark:bg-yellow-500 border-0 ',
                                    'text-white bg-red-500 not-dark:bg-red-500/80 border-0 '
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-zinc-500">
                                    {t('resistant')} (x0.5, x0.25)
                                </span>
                                {renderMultiplierList(
                                    resistantToTypes,
                                    0.5,
                                    'text-white bg-green-500 not-dark:bg-green-500/80 border-0',
                                    'text-white bg-blue-500 not-dark:bg-blue-500/80 border-0'
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-zinc-500">
                                    {t('noEffectFrom')} (x0)
                                </span>
                                {noEffectTypes.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {noEffectTypes.map((e) => (
                                            <div
                                                key={e}
                                                className="flex items-center gap-1 rounded-full border-0 bg-purple-500 px-2 py-1 text-sm dark:text-white"
                                            >
                                                <Image
                                                    src={iconElements(e)}
                                                    alt={e}
                                                    width={16}
                                                    height={16}
                                                />
                                                <span>{t(e)} (x0)</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-zinc-500">-</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CalculateType
