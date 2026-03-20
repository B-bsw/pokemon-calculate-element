'use client'
import { useTranslate } from '@/i18n/i18nContext'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@heroui/react'

const naturesData = [
    {
        plus: '+ stat.attack',
        natures: [
            { name: 'Hardy', neutral: true },
            { name: 'Lonely', neutral: false },
            { name: 'Adamant', neutral: false },
            { name: 'Naughty', neutral: false },
            { name: 'Brave', neutral: false },
        ],
    },
    {
        plus: '+ stat.defense',
        natures: [
            { name: 'Bold', neutral: false },
            { name: 'Docile', neutral: true },
            { name: 'Impish', neutral: false },
            { name: 'Lax', neutral: false },
            { name: 'Relaxed', neutral: false },
        ],
    },
    {
        plus: '+ stat.spAtk',
        natures: [
            { name: 'Modest', neutral: false },
            { name: 'Mild', neutral: false },
            { name: 'Bashful', neutral: true },
            { name: 'Rash', neutral: false },
            { name: 'Quiet', neutral: false },
        ],
    },
    {
        plus: '+ stat.spDef',
        natures: [
            { name: 'Calm', neutral: false },
            { name: 'Gentle', neutral: false },
            { name: 'Careful', neutral: false },
            { name: 'Quirky', neutral: true },
            { name: 'Sassy', neutral: false },
        ],
    },
    {
        plus: '+ stat.speed',
        natures: [
            { name: 'Timid', neutral: false },
            { name: 'Hasty', neutral: false },
            { name: 'Jolly', neutral: false },
            { name: 'Naive', neutral: false },
            { name: 'Serious', neutral: true },
        ],
    },
]

const TableNature = () => {
    const { t } = useTranslate()

    return (
        <div className="w-full max-w-5xl overflow-auto">
            <Table
                aria-label="Pokemon nature table"
                classNames={{
                    base: 'max-h-[calc(100vh-8rem)]',
                    th: 'text-sm text-center text-nowrap',
                    td: 'text-sm text-center text-nowrap',
                }}
            >
                <TableHeader>
                    <TableColumn> </TableColumn>
                    <TableColumn className="text-danger-500">
                        - {t('stat.attack')}
                    </TableColumn>
                    <TableColumn className="text-danger-500">
                        - {t('stat.defense')}
                    </TableColumn>
                    <TableColumn className="text-danger-500">
                        - {t('stat.spAtk')}
                    </TableColumn>
                    <TableColumn className="text-danger-500">
                        - {t('stat.spDef')}
                    </TableColumn>
                    <TableColumn className="text-danger-500">
                        - {t('stat.speed')}
                    </TableColumn>
                </TableHeader>

                <TableBody>
                    {naturesData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-success-500 text-left font-semibold text-nowrap">
                                {row.plus
                                    .replace('stat.', '')
                                    .includes('Atk') ||
                                row.plus.replace('stat.', '').includes('Def')
                                    ? row.plus.split(' ')[0] +
                                      ' ' +
                                      t('stat.' + row.plus.split('.')[1])
                                    : row.plus.split(' ')[0] +
                                      ' ' +
                                      t('stat.' + row.plus.split('.')[1])}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={
                                        row.natures[0].neutral
                                            ? 'text-zinc-500 not-dark:text-zinc-400'
                                            : 'font-medium text-zinc-800 not-dark:text-zinc-200'
                                    }
                                >
                                    {row.natures[0].name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={
                                        row.natures[1].neutral
                                            ? 'text-zinc-500 not-dark:text-zinc-400'
                                            : 'font-medium text-zinc-800 not-dark:text-zinc-200'
                                    }
                                >
                                    {row.natures[1].name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={
                                        row.natures[2].neutral
                                            ? 'text-zinc-500 not-dark:text-zinc-400'
                                            : 'font-medium text-zinc-800 not-dark:text-zinc-200'
                                    }
                                >
                                    {row.natures[2].name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={
                                        row.natures[3].neutral
                                            ? 'text-zinc-500 not-dark:text-zinc-400'
                                            : 'font-medium text-zinc-800 not-dark:text-zinc-200'
                                    }
                                >
                                    {row.natures[3].name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={
                                        row.natures[4].neutral
                                            ? 'text-zinc-500 not-dark:text-zinc-400'
                                            : 'font-medium text-zinc-800 not-dark:text-zinc-200'
                                    }
                                >
                                    {row.natures[4].name}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TableNature
