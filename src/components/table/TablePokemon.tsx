'use client'
import typeChart from '@/libs/DataElement'
import Image from 'next/image'
import iconElements from '@/components/icons'
import { useTranslate } from '@/i18n/i18nContext'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@heroui/react'

const TablePokemon = () => {
    const { t } = useTranslate()

    return (
        <div className="w-full max-w-4xl overflow-auto">
            <Table
                aria-label="Pokemon element table"
                classNames={{
                    base: 'max-h-[calc(100vh-8rem)]',
                    th: 'text-sm',
                    td: 'text-sm',
                }}
            >
                <TableHeader>
                    <TableColumn>{t('elemental')}</TableColumn>
                    <TableColumn>{t('strong')}</TableColumn>
                    <TableColumn>{t('weak')}</TableColumn>
                    <TableColumn>{t('noEffectFrom')}</TableColumn>
                </TableHeader>

                <TableBody>
                    {typeChart.map((e) => (
                        <TableRow key={e.name}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className={`shrink-0 rounded-full p-1 ${e.name.toLowerCase()}`}>
                                        <Image
                                            src={iconElements(e.name)}
                                            alt={e.name}
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <span className="font-medium">{t(e.name)}</span>
                                </div>
                            </TableCell>

                            <TableCell>
                                <span className="text-zinc-600 not-dark:text-zinc-400">
                                    {e.strongAgainst.map((st) => t(st)).join(', ')}
                                </span>
                            </TableCell>

                            <TableCell>
                                <span className="text-zinc-600 not-dark:text-zinc-400">
                                    {e.weakAgainst.map((wk) => t(wk)).join(', ')}
                                </span>
                            </TableCell>

                            <TableCell>
                                <span className="text-zinc-600 not-dark:text-zinc-400">
                                    {e.noEffectFrom.length > 0
                                        ? e.noEffectFrom.map((no) => t(no)).join(', ')
                                        : '-'
                                    }
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TablePokemon
