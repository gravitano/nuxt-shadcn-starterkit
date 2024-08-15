<script setup lang="ts">
import type { PaginationState, Table } from '@tanstack/vue-table'

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
  itemsPerPage = 10,
  totalItems = 0,
  siblingCount = 1,
  showEdges = true,
  defaultPage = 1,
} = defineProps<{
  isLoading?: boolean
  itemsPerPage: number
  totalItems: number
  siblingCount?: number
  showEdges?: boolean
  defaultPage?: number
}>()

const currentPage = defineModel<number>('page', {
  default: 0,
})
</script>

<template>
  <Pagination
    v-slot="{ page }"
    v-model:page="currentPage"
    :total="totalItems"
    :sibling-count="siblingCount"
    :show-edges="showEdges"
    :default-page="defaultPage"
    :items-per-page="itemsPerPage"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-2 justify-between w-full">
      <div class="flex gap-3 items-center">
        <PaginationFirst />
        <PaginationPrev />
      </div>

      <div class="flex gap-3 items-center">
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button
              class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" class="text-gray-500" />
        </template>
      </div>

      <div class="flex gap-3 items-center">
        <PaginationNext />
        <PaginationLast />
      </div>
    </PaginationList>
  </Pagination>
</template>
