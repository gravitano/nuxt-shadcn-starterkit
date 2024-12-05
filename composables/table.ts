import { type ColumnFiltersState, type PaginationState, type SortingState, type VisibilityState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { ComputedRef, Ref } from 'vue'
import { valueUpdater } from '@/lib/utils'

export interface Table<T> {
  data: ComputedRef<T[]>
  columns: any[]
  sorting: Ref<SortingState>
  columnFilters: Ref<ColumnFiltersState>
  columnVisibility: Ref<VisibilityState>
  rowSelection: Ref<Record<string, boolean>>
  pagination: Ref<PaginationState>
  totalItems: ComputedRef<number>
  manualPagination?: boolean
  manualSorting?: boolean
  columnPinning?: Record<string, string[]>
}

export function useTable<T>({
  data,
  columns,
  sorting,
  columnFilters,
  columnVisibility,
  rowSelection,
  pagination,
  totalItems,
  manualPagination = true,
  manualSorting = true,
  columnPinning = {},
}: Table<T>) {
  return useVueTable({
    get data() {
      return data.value
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue =>
      valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue =>
      valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue =>
      valueUpdater(updaterOrValue, rowSelection),
    manualPagination,
    manualSorting,
    rowCount: toValue(totalItems),
    onPaginationChange: (updater: any) => {
      pagination.value = updater(pagination.value)
    },
    state: {
      get sorting() {
        return sorting.value
      },
      get columnFilters() {
        return columnFilters.value
      },
      get columnVisibility() {
        return columnVisibility.value
      },
      get rowSelection() {
        return rowSelection.value
      },
      columnPinning,
      get pagination() {
        return pagination.value
      },
    },
  })
}
