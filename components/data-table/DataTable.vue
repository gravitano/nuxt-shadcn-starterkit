<script setup lang="ts" generic="T">
import {
  type ColumnDef,
  type ColumnFiltersState,
  FlexRender,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/vue-table'
import { useTable } from '~/composables/table'
import { cn } from '~/lib/utils'

export interface DataTableProps<T> {
  data: T[]
  totalItems: number
  columns: ColumnDef<T>[]
  isLoading?: boolean
  itemsPerPageOptions?: number[]
  hideHeader?: boolean
  emptyText?: string
  manualPagination?: boolean
  manualSorting?: boolean
}

const {
  data = [],
  columns = [],
  totalItems = 0,
  itemsPerPageOptions = [10, 20, 30, 40, 50],
  emptyText = 'Tidak ada data',
  manualPagination = true,
  manualSorting = true,
} = defineProps<DataTableProps<T>>()

const currentPage = defineModel<number>('page', {
  default: 1,
})

const columnFilters = defineModel<ColumnFiltersState>('columnFilters', {
  default: [],
})
const columnVisibility = defineModel<VisibilityState>('columnVisibility', {
  default: {},
})
const rowSelection = defineModel<RowSelectionState>('rowSelection', {
  default: {},
})
const sorting = defineModel<SortingState>('sorting', {
  default: [],
})
const pagination = defineModel<PaginationState>('pagination', {
  default: {
    pageIndex: 0,
    pageSize: 10,
  },
})

const table = useTable({
  data: computed(() => data),
  columns,
  sorting,
  columnFilters,
  columnVisibility,
  rowSelection,
  pagination,
  totalItems: computed(() => totalItems),
  manualPagination,
  manualSorting,
})

watch(currentPage, (val) => {
  table.setPageIndex(val - 1)
})
</script>

<template>
  <div class="w-full border rounded-lg shadow">
    <div class="relative">
      <Table>
        <TableHeader
          v-if="!hideHeader"
        >
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :data-pinned="header.column.getIsPinned()"
              :class="
                cn(
                  'text-sm bg-gray-100 font-bold text-gray-800',
                  {
                    'sticky bg-background/95': header.column.getIsPinned(),
                  },
                  header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                )
              "
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="isLoading">
            <template v-for="size in pagination.pageSize" :key="size">
              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <TableCell
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                >
                  <Skeleton class="h-4 min-w-2 w-full" />
                </TableCell>
              </TableRow>
            </template>
          </template>

          <template
            v-else-if="table.getRowModel().rows?.length"
          >
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
              :class="cn(
                'even:bg-gray-50',
              )"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :data-pinned="cell.column.getIsPinned()"
                :class="
                  cn(
                    {
                      'sticky bg-background/95': cell.column.getIsPinned(),
                    },
                    cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                  )
                "
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <slot name="empty-text">
                {{ emptyText }}
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTableFooter
      v-model:page="currentPage"
      :total-items="totalItems"
      :is-loading="isLoading"
      :items-per-page="String(pagination.pageSize)"
      :items-per-page-options="itemsPerPageOptions"
      @update:items-per-page="itemsPerPage => {
        table.setPageSize(Number(itemsPerPage))
      }"
    />
  </div>
</template>
