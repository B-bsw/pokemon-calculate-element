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
    Skeleton,
} from '@heroui/react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'

type PokemonItem = {
    id: number
    name: string
    url: string
    numberOfPokemon: string
    img: string
    isLoaded: boolean
    isFetching: boolean
}

type PokemonList = PokemonItem[]

export default function Pokemon() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // Initialize from URL params
    const initialSearch = searchParams.get('q') || ''
    const initialPage = parseInt(searchParams.get('page') || '1', 10)
    
    const [dataPokemon, setDataPokemon] = useState<PokemonList>([])
    const [page, setPage] = useState<number>(initialPage)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<string>(initialSearch)
    const fetchedIds = useRef<Set<number>>(new Set())

    const { t } = useTranslate()

    // Update URL when search or page changes
    const updateURL = useCallback((newSearch: string, newPage: number) => {
        const params = new URLSearchParams()
        if (newSearch) params.set('q', newSearch)
        if (newPage > 1) params.set('page', newPage.toString())
        const queryString = params.toString()
        router.replace(`/pokemon${queryString ? `?${queryString}` : ''}`, { scroll: false })
    }, [router])

    // Initial loading - get list of all Pokemon
    const loading = async () => {
        try {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=1328&offset=0`
            )
            const data = res.data.results
            const dataWithIndex: PokemonList = data.map(
                (e: { name: string; url: string }, index: number) => ({
                    id: index + 1,
                    name: e.name,
                    url: e.url,
                    numberOfPokemon: (index + 1).toString().padStart(4, '0'),
                    img: '', // Will be fetched later
                    isLoaded: false,
                    isFetching: false,
                })
            )
            setDataPokemon(dataWithIndex)
            // Page is already initialized from URL params, only set to 1 if no page param
            if (!searchParams.get('page')) {
                setPage(1)
            }
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    // Fetch sprite for a specific Pokemon
    const fetchPokemonSprite = async (pokemon: PokemonItem) => {
        if (fetchedIds.current.has(pokemon.id)) return

        fetchedIds.current.add(pokemon.id)

        try {
            const response = await axios.get(pokemon.url)
            const sprites = response.data.sprites
            const imgUrl =
                sprites.other?.dream_world?.front_default ||
                sprites.other?.['official-artwork']?.front_default ||
                sprites.front_default ||
                ''

            setDataPokemon((prev) =>
                prev.map((p) =>
                    p.id === pokemon.id
                        ? { ...p, img: imgUrl, isFetching: false }
                        : p
                )
            )
        } catch (err) {
            console.error(`Error fetching sprite for ${pokemon.name}:`, err)
            // Set a fallback image
            setDataPokemon((prev) =>
                prev.map((p) =>
                    p.id === pokemon.id
                        ? {
                              ...p,
                              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
                              isFetching: false,
                          }
                        : p
                )
            )
        }
    }

    // Fetch sprites for current page items
    useEffect(() => {
        if (items.length > 0) {
            items.forEach((item) => {
                if (!item.img && !item.isFetching) {
                    fetchPokemonSprite(item)
                }
            })
        }
    }, [page, dataPokemon.length])

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

    // Fetch sprites when items change (page change or search)
    useEffect(() => {
        items.forEach((item) => {
            if (!item.img && !fetchedIds.current.has(item.id)) {
                fetchPokemonSprite(item)
            }
        })
    }, [items])

    // Handle search change with callback to prevent input freezing
    const handleSearchChange = useCallback((value: string) => {
        setSearch(value)
        setPage(1)
        updateURL(value, 1)
    }, [updateURL])

    // Handle page change
    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage)
        updateURL(search, newPage)
    }, [search, updateURL])

    return (
        <>
            <div className="flex h-screen w-full items-center justify-center p-4">
                <section className="flex w-full max-w-xl flex-col gap-4">
                    <Input
                        type="text"
                        placeholder={t('searchNameOrNumber')}
                        value={search}
                        onValueChange={handleSearchChange}
                        variant="faded"
                        color="primary"
                        isClearable
                        onClear={() => handleSearchChange('')}
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
                                        onChange={handlePageChange}
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
                                                    <div className="relative h-8 w-8">
                                                        {!item.img || !item.isLoaded ? (
                                                            <Skeleton className="h-8 w-8 rounded-full" />
                                                        ) : null}

                                                        {item.img && (
                                                            <Image
                                                                src={item.img}
                                                                alt={item.name}
                                                                width={26}
                                                                height={26}
                                                                className={
                                                                    !item.isLoaded
                                                                        ? 'invisible absolute'
                                                                        : ''
                                                                }
                                                                onLoad={() => {
                                                                    setDataPokemon(
                                                                        (prev) =>
                                                                            prev.map(
                                                                                (p) =>
                                                                                    p.id ===
                                                                                    item.id
                                                                                        ? {
                                                                                              ...p,
                                                                                              isLoaded: true,
                                                                                          }
                                                                                        : p
                                                                            )
                                                                    )
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    <Link
                                                        href={`/pokemon/${item.name}`}
                                                        className="capitalize"
                                                    >
                                                        {item.name}
                                                    </Link>
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
