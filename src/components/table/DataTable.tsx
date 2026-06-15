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
            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    variant="flat"
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={totalPages}
                    onChange={onPageChange}
                />
            </div>
        ) : null

    return (
        <Table
            classNames={{
                wrapper:
                    'border-2 border-zinc-900 dark:border-zinc-50 shadow-none rounded-xl bg-zinc-50 dark:bg-zinc-900',
                th: 'text-center bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 font-bold uppercase',
                td: 'text-center font-semibold',
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
                        className={`border-b-2 border-transparent transition-colors hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 ${
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
