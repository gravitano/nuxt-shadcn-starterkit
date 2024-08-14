<script setup lang="ts" generic="T">
import type { PaginationState, Table } from '@tanstack/vue-table'
import { cn } from '~/lib/utils'
import { ChevronRight } from 'lucide-vue-next'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'

const {
  pagination,
  totalItems = 0,
  siblingCount = 1,
  showEdges = true, defaultPage = 1
 } = defineProps<{
  table: Table<T>
  isLoading?: boolean
  pagination: PaginationState
  totalItems: number
  siblingCount?: number
  showEdges?: boolean
  defaultPage?: number
}>()
</script>

<template>
   <Pagination v-slot="{ page }" :total="totalItems" :sibling-count="siblingCount" :show-edges="showEdges" :default-page="defaultPage">
    <PaginationList v-slot="{ items }" class="flex items-center gap-2 justify-between w-full">
      <div class="flex gap-3 items-center">
        <PaginationFirst 
          @click="table.firstPage()"
        />
        <PaginationPrev
          @click="table.previousPage()"
        />
      </div>

      <div class="flex gap-3 items-center">
      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'"
          @click="table.setPageIndex(page - 1)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" class="text-gray-500" />
      </template>
    </div>

    <div class="flex gap-3 items-center">
      <PaginationNext
        @click="table.nextPage()"
      />
      <PaginationLast
        @click="table.lastPage()"
      />
    </div>
    </PaginationList>
  </Pagination>
</template>
