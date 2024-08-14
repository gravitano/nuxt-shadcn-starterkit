<script setup lang="ts" generic="T">
import type { PaginationState, Table } from '@tanstack/vue-table'
import Pagino from 'pagino'
import { cn } from '~/lib/utils'

const { pagination, totalItems } = defineProps<{
  table: Table<T>
  isLoading?: boolean
  pagination: PaginationState
  totalItems: number
}>()

const pages = computed(() => {
  const pagino = new Pagino({
    showPrevious: false,
    showNext: false,
    showFirst: false,
    showLast: false,
    page: pagination.pageIndex + 1,
  })
  pagino.setCount(totalItems)
  pagino.setPage(pagination.pageIndex + 1)
  return pagino.getPages()
})
</script>

<template>
  <div class="flex flex-row gap-2 items-center justify-between space-x-2 pt-4">
    <!-- <div class="flex-1 text-sm text-muted-foreground">
            {{ table.getFilteredSelectedRowModel().rows.length }} of
            {{ table.getFilteredRowModel().rows.length }} row(s) selected.
          </div> -->

    <Button
      variant="outline"
      size="sm"
      :disabled="!table.getCanPreviousPage()"
      class="gap-2"
      @click="table.previousPage()"
    >
      <Icon
        name="ri:arrow-left-line"
        size="20"
        class="text-icon disabled:text-disabled"
      />
      <span class="hidden lg:inline">Sebelumnya</span>
    </Button>

    <div class="flex items-center gap-2 overflow-x-auto">
      <template v-for="page in pages" :key="page">
        <Button
          variant="ghost"
          :class="
            cn({
              'bg-gray-100 text-gray-800': pagination.pageIndex + 1 === page,
            })
          "
          :disabled="
            isLoading || ['start-ellipsis', 'end-ellipsis'].includes(page)
          "
          @click="table.setPageIndex(page - 1)"
        >
          <span v-if="['start-ellipsis', 'end-ellipsis'].includes(page)">
            ...
          </span>
          <span v-else>
            {{ page }}
          </span>
        </Button>
      </template>
    </div>

    <Button
      variant="outline"
      size="sm"
      :disabled="isLoading || !table.getCanNextPage()"
      class="gap-2"
      @click="table.nextPage()"
    >
      <span class="hidden lg:inline">Selanjutnya</span>
      <Icon
        name="ri:arrow-right-line"
        size="20"
        class="text-icon disabled:text-disabled"
      />
    </Button>
  </div>
</template>
