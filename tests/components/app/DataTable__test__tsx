import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import { type ColumnFiltersState, type PaginationState, type SortingState, type VisibilityState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import DataTable from '~/components/app/data-table/DataTable.vue'
import { valueUpdater } from '~/lib/utils'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import TableAction from '~/components/app/TableAction'
import type { Task } from '~/api'

mockComponent('DataTable', () => import('~/components/app/data-table/DataTable.vue'))

describe('dataTable', () => {
  it('can mount some component', async () => {
    const columnHelper = createColumnHelper<Task>()
    const sorting = ref<SortingState>([])
    const columnFilters = ref<ColumnFiltersState>([])
    const columnVisibility = ref<VisibilityState>({})
    const rowSelection = ref({})
    const isDeleteModalOpen = ref(false)
    const selectedItem = ref<Task | null>(null)
    const pagination = ref<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
    const totalItems = ref(1000)

    const columns = [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
              || (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onUpdate:checked={value => table.toggleAllPageRowsSelected(!!value)}
            ariaLabel="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onUpdate:checked={value => row.toggleSelected(!!value)}
            ariaLabel="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),

      columnHelper.accessor('title', {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              class="px-0"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Title
              {' '}
              <ArrowUpDown class="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div class="lowercase">{row.getValue('title')}</div>,
      }),
      columnHelper.accessor('completed', {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              class="px-0"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Is Completed ?
              {' '}
              <ArrowUpDown class="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <Badge variant="secondary" class="whitespace-nowrap uppercase">
            {row.getValue('completed') ? 'Yes' : 'No'}
          </Badge>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <TableAction
              row={row}
              onDelete={() => {
                selectedItem.value = row.original
                isDeleteModalOpen.value = true
              }}
            />
          )
        },
      }),
    ]

    const data = computed(() => {
      return Array.from({ length: 1000 }, (_, index) => ({
        id: index,
        title: `Task ${index}`,
        completed: Math.random() > 0.5,
      }))
    })

    const table = useVueTable({
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
      manualPagination: true,
      rowCount: totalItems.value,
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
        columnPinning: {
          // left: ['title'],
        },
        get pagination() {
          return pagination.value
        },
      },
    })

    const component = await mountSuspended(DataTable, {
      props: {
        columns,
        pagination: pagination.value,
        table,
        totalItems: totalItems.value,
      },
    })

    expect(component).toBeTruthy()
  })
})
