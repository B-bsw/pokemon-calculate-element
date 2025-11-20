'use client'

import { useTranslate } from '@/i18n/i18nContext'
import {
    getKeyValue,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Input,
} from '@heroui/react'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type Pokemon = {
    id: number
    name: string
    numberOfPokemon: string
    img: string
}[]

export default function Pokemon() {
    const [dataPokemon, setDataPokemon] = useState<Pokemon>([])
    const [page, setPage] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>('')

    const { t } = useTranslate()

    const loading = async () => {
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=1328&offset=0`,
            )
            const data: Pokemon = res.data.results
            const dataWithIndex = data.map((e, index) => ({
                id: index + 1,
                name: e.name,
                numberOfPokemon:
                    (index + 1).toString().length === 1
                        ? `000${index + 1}`
                        : (index + 1).toString().length === 2
                          ? `00${index + 1}`
                          : (index + 1).toString().length === 3
                            ? `0${index + 1}`
                            : (index + 1).toString(),
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index >= 1025 ? index + 8976 : index + 1}.png`,
            }))
            setDataPokemon(dataWithIndex)
            setPage(1)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loading()
    }, [])

    const columns = [
        { key: 'id', label: t('index') },
        { key: 'name', label: t('name') },
        { key: 'numberOfPokemon', label: t('no.') },
    ]

    const filtered = useMemo(() => {
        return dataPokemon.filter((p) => {
            const s = search.toLowerCase()
            return (
                p.name.toLowerCase().includes(s) ||
                p.numberOfPokemon.includes(s)
            )
        })
    }, [search, dataPokemon])

    const pages = Math.ceil(filtered.length / 10)

    const items = useMemo(() => {
        const start = (page - 1) * 10
        const end = start + 10
        return filtered.slice(start, end)
    }, [page, filtered])

    return (
        <>
            <div className="flex h-screen sm:-mt-25 w-full items-center justify-center p-4">
                <section className="flex w-full max-w-xl flex-col gap-4">
                    <Input
                        type="text"
                        placeholder={t('searchNameOrNumber')}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        variant='faded'
                        color='primary'
                    />

                    <Table
                        classNames={{ th: 'text-center', td: 'text-center' }}
                        aria-label="table-of-pokemon"
                        bottomContent={
                            page > 0 ? (
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        variant="flat"
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={pages}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            ) : null
                        }
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>

                        <TableBody
                            items={items}
                            emptyContent={'No Pokemon.'}
                            isLoading={isLoading}
                            loadingContent={<Spinner />}
                        >
                            {(item) => (
                                <TableRow key={item.name}>
                                    {(key) => (
                                        <TableCell>
                                            {key === 'name' ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Image
                                                        src={item.img}
                                                        alt="img"
                                                        width={32}
                                                        height={32}
                                                    />
                                                    <span className="capitalize">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            ) : (
                                                getKeyValue(item, key)
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </section>
            </div>
        </>
    )
}
