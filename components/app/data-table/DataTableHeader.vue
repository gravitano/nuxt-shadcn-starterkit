<script setup lang="ts" generic="T">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<T>
}>()
</script>

<template>
  <div
    class="flex flex-col lg:flex-row gap-2 lg:items-center py-4 justify-between"
  >
    <div class="flex items-center gap-1">
      <p class="text-sm font-medium">
        Tampilkan
      </p>
      <Select
        :model-value="`${table.getState().pagination.pageSize}`"
        @update:model-value="table.setPageSize"
      >
        <SelectTrigger class="h-8 w-[70px]">
          <SelectValue
            :placeholder="`${table.getState().pagination.pageSize}`"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="pageSize in [10, 20, 30, 40, 50]"
            :key="pageSize"
            :value="`${pageSize}`"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
      <p class="text-sm font-medium">
        entri
      </p>
    </div>

    <div class="flex items-center">
      <Icon
        name="ri:search-line"
        size="20"
        class="text-icon absolute inset-y-auto ml-[14px]"
      />
      <Input
        class="max-w-sm pl-10"
        placeholder="Cari"
        :model-value="table.getColumn('title')?.getFilterValue() as string"
        @update:model-value="table.getColumn('title')?.setFilterValue($event)"
      />
    </div>

    <!-- <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="ml-auto">
                Columns <ChevronDown class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                v-for="column in table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())"
                :key="column.id"
                class="capitalize"
                :checked="column.getIsVisible()"
                @update:checked="
                  (value) => {
                    column.toggleVisibility(!!value);
                  }
                "
              >
                {{ column.id }}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu> -->
  </div>
</template>
