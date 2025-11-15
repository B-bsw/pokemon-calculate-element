'use client'

import {
    getKeyValue,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

type Pokemon = {
    id: number
    name: string
    numberOfPokemon: string
}[]

export default function Pokemon() {
    const [dataPokemon, setDataPokemon] = useState<Pokemon>([])
    const [page, setPage] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

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
                            : index.toString(),
            }))
            setDataPokemon(dataWithIndex)
            setPage(1)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loading()
    }, [])

    const columns = [
        {
            key: 'id',
            label: 'index',
        },
        {
            key: 'name',
            label: 'name',
        },
        { key: 'numberOfPokemon', label: 'No.' },
    ]

    const pages = Math.ceil(dataPokemon.length / 10)

    const items = useMemo(() => {
        const start = (page - 1) * 10
        const end = start + 10

        return dataPokemon.slice(start, end)
    }, [page, dataPokemon])
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center p-4">
                <section className="w-full max-w-xl overflow-auto">
                    <Table
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
                            loadingContent={<div>Loading</div>}
                        >
                            {(item) => (
                                <TableRow key={item?.name}>
                                    {(pokemon) => (
                                        <>
                                            <TableCell>
                                                {getKeyValue(item, pokemon)}
                                            </TableCell>
                                        </>
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
