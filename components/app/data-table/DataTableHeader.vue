<script setup lang="ts" generic="TData, TValue">
import type { Column } from '@tanstack/vue-table'
import { ArrowDownIcon } from '@morphemeicons/vue/untitled'

defineProps<{
  column: Column<TData, TValue>
  label: string
  onClick: () => void
}>()
</script>

<template>
  <Button
    v-if="column.getCanSort()"
    variant="ghost"
    type="button"
    :aria-label="label"
    class="px-0 font-bold uppercase"
    @click="onClick"
  >
    {{ label }}
    <ArrowDownIcon
      class="ml-2 h-4 w-4 transform"
      :class="{
        'rotate-180': column.getIsSorted() === 'asc',
      }"
    />
  </Button>
  <span v-else class="font-bold uppercase">{{ label }}</span>
</template>
