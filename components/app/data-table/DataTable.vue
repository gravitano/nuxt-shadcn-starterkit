<script setup lang="ts" generic="T">
import {
  FlexRender,
  type PaginationState,
  type Table,
} from '@tanstack/vue-table'
import { cn } from '~/lib/utils'

const { pagination, totalItems, table } = defineProps<{
  table: Table<T>
  isLoading?: boolean
  pagination: PaginationState
  totalItems: number
  columns: any[]
}>()

const currentPage = defineModel<number>('page', {
  default: 1,
})

watch(currentPage, () => {
  table.setPageIndex(currentPage.value - 1)
})
</script>

<template>
  <div class="w-full">
    <DataTableHeader :table="table" />
    <div class="-mx-6 border-y relative">
      <Table>
        <TableHeader>
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

          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
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
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination
      v-model:page="currentPage"
      class="mt-6"
      :table
      :is-loading
      :total-items
      :items-per-page="pagination.pageSize"
    />
  </div>
</template>
