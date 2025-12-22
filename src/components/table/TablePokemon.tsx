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
        <div className="mx-auto mb-5 max-w-3xl overflow-auto h-[90vh] rounded-2xl">
            <Table aria-label="Pokemon element table">
                <TableHeader>
                    <TableColumn>{t('elemental')}</TableColumn>
                    <TableColumn>{t('strong')}</TableColumn>
                    <TableColumn>{t('weak')}</TableColumn>
                    <TableColumn>{t('noEffectFrom')}</TableColumn>
                </TableHeader>

                <TableBody>
                    {typeChart.map((e) => (
                        <TableRow key={e.name}>
                            <TableCell className="flex w-full items-center gap-3">
                                <div className="shrink-0">
                                    <Image
                                        src={iconElements(e.name)}
                                        alt={e.name}
                                        width={30}
                                        height={30}
                                        className={`icon ${e.name.toLowerCase()}`}
                                    />
                                </div>
                                <div>{t(e.name)}</div>
                            </TableCell>

                            <TableCell>
                                {e.strongAgainst.map((st) => t(st)).join(', ')}
                            </TableCell>

                            <TableCell>
                                {e.weakAgainst.map((wk) => t(wk)).join(', ')}
                            </TableCell>

                            <TableCell>
                                {e.noEffectFrom.map((no) => t(no)).join(', ')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TablePokemon
