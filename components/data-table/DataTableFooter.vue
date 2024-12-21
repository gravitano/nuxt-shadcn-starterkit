<script setup lang="ts" generic="T">
export interface DataTableFooterProps {
  totalItems: number
  itemsPerPageOptions?: number[]
}

const {
  totalItems,
  itemsPerPageOptions = [10, 20, 30, 40, 50],
} = defineProps<DataTableFooterProps>()

const currentPage = defineModel<number>('page', {
  default: 1,
})

const itemsPerPage = defineModel<string>('itemsPerPage', {
  default: '10',
})

const paginationFrom = computed(() => {
  return currentPage.value * +itemsPerPage.value - +itemsPerPage.value + 1
})

const paginationTo = computed(() => {
  return currentPage.value * +itemsPerPage.value
})
</script>

<template>
  <div
    class="px-6 border-t py-4 flex flex-col lg:flex-row gap-4 items-center justify-between"
  >
    <div class="flex flex-col lg:flex-row items-center gap-2">
      <div class="flex items-center gap-2">
        <div class="text-sm font-medium text-gray-700">
          Tampilkan Data
        </div>
        <Select
          v-model="itemsPerPage"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue
              :placeholder="itemsPerPage"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="pageSize in itemsPerPageOptions"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="text-sm font-medium text-gray-700">
        {{ paginationFrom }} - {{ Math.min(paginationTo, totalItems) }} data dari {{ totalItems }} data.
      </div>
    </div>
    <DataTablePagination
      v-model:page="currentPage"
      :total-items="totalItems"
      :items-per-page="Number(itemsPerPage)"
    />
  </div>
</template>
