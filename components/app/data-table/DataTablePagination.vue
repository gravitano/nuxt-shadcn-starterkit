<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@morphemeicons/vue/untitled'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'

export interface DataTablePaginationProps {
  itemsPerPage: number
  totalItems: number
  siblingCount?: number
  showEdges?: boolean
  defaultPage?: number
}

const {
  itemsPerPage = 10,
  totalItems = 0,
  siblingCount = 1,
  showEdges = true,
  defaultPage = 1,
} = defineProps<DataTablePaginationProps>()

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
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-between w-full"
    >
      <div class="flex items-center">
        <!-- <PaginationFirst class="rounded-none rounded-l-lg border-[#D0D5DD]" /> -->
        <PaginationPrev class="rounded-none rounded-l-lg border-[#D0D5DD] w-auto px-4">
          <ArrowLeftIcon class="size-5 xl:mr-2" />
          <span class="hidden xl:inline">Sebelumnya</span>
        </PaginationPrev>
      </div>

      <div class="flex items-center">
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button
              class="w-10 h-10 p-0 rounded-none border-[#D0D5DD] border-l-0"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="item.type"
            :index="index"
            class="text-gray-500 border h-10 border-[#D0D5DD] border-l-0"
          />
        </template>
      </div>

      <div class="flex items-center">
        <PaginationNext class="rounded-none rounded-r-lg border-[#D0D5DD] border-l-0 w-auto px-4">
          <span class="hidden xl:inline">Selanjutnya</span>
          <ArrowRightIcon class="size-5 xl:ml-2" />
        </PaginationNext>
        <!-- <PaginationLast class="rounded-none rounded-r-lg border-[#D0D5DD] border-l-0" /> -->
      </div>
    </PaginationList>
  </Pagination>
</template>
