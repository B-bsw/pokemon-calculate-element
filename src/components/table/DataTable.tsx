'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination,
    Spinner,
} from '@heroui/react'
import { ReactNode } from 'react'

export type ColumnDefinition = {
    key: string
    label: string
}

interface DataTableProps<T> {
    columns: ColumnDefinition[]
    items: T[]
    isLoading: boolean
    emptyContent: string | ReactNode
    renderCell: (item: T, columnKey: string) => ReactNode
    getRowKey: (item: T) => string | number
    onRowClick?: (item: T) => void
    page?: number
    totalPages?: number
    onPageChange?: (page: number) => void
    ariaLabel?: string
}

export default function DataTable<T>({
    columns,
    items,
    isLoading,
    emptyContent,
    renderCell,
    getRowKey,
    onRowClick,
    page,
    totalPages,
    onPageChange,
    ariaLabel = 'data-table',
}: DataTableProps<T>) {
    const bottomContent =
        page !== undefined && totalPages !== undefined && totalPages > 0 ? (
            <div className="mt-5 flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    color="primary"
                    page={page}
                    total={totalPages}
                    onChange={onPageChange}
                    classNames={{
                        base: 'gap-2',
                        wrapper:
                            'border-3 border-zinc-900 dark:border-[#f7f1df] shadow-[4px_4px_0_#151515] dark:shadow-[4px_4px_0_#f7f1df] rounded-none bg-[#f7f1df] dark:bg-[#151515] overflow-hidden',
                        item: 'bg-transparent text-zinc-900 dark:text-zinc-50 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800',
                        cursor: 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 font-bold',
                        prev: 'bg-transparent text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800',
                        next: 'bg-transparent text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800',
                    }}
                />
            </div>
        ) : null

    return (
        <Table
            classNames={{
                wrapper:
                    'border-4 border-zinc-900 dark:border-[#f7f1df] shadow-[7px_7px_0_#151515] dark:shadow-[7px_7px_0_#f7f1df] rounded-none bg-[#f7f1df] dark:bg-[#151515]',
                th: 'text-center bg-[#ffcc33] text-[#151515] border-b-3 border-[#151515] font-mono font-black uppercase tracking-wider',
                td: 'text-center font-mono font-bold border-b border-zinc-900/25 dark:border-[#f7f1df]/25',
            }}
            aria-label={ariaLabel}
            bottomContent={bottomContent}
            selectionMode={'none'}
            onRowAction={
                onRowClick
                    ? (key) => {
                          const item = items.find(
                              (i) => getRowKey(i).toString() === key.toString()
                          )
                          if (item) onRowClick(item)
                      }
                    : undefined
            }
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={items}
                emptyContent={emptyContent}
                isLoading={isLoading}
                loadingContent={<Spinner />}
            >
                {(item) => (
                    <TableRow
                        key={getRowKey(item)}
                        className={`transition-colors hover:bg-[#b9f227] hover:text-[#151515] ${
                            onRowClick ? 'cursor-pointer' : ''
                        }`}
                    >
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey as string)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
