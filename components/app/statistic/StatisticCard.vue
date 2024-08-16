<script setup lang="ts">
export interface StatisticCardProps {
  title: string
  value: string | number
  icon: string | Component
  color: 'blue' | 'orange' | 'green' | 'red'
}

defineProps<StatisticCardProps>()

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500 text-white',
  orange: 'bg-orange-500 text-white',
  green: 'bg-green-500 text-white',
  red: 'bg-red-500 text-white',
}
</script>

<template>
  <div class="bg-white px-4 py-3 rounded-[12px] shadow flex gap-4 items-center">
    <div
      class="rounded-lg flex items-center justify-center w-[61px] h-[71px]"
      :class="colorMap[color]"
    >
      <component :is="icon" class="size-7" />
    </div>
    <div class="flex flex-col">
      <h3 class="text-sm font-medium text-gray-500">
        {{ title }}
      </h3>
      <div class="text-[32px]/[48px] font-semibold text-gray-800">
        {{ value }}
      </div>
    </div>
  </div>
</template>
