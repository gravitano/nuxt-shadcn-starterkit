<script setup lang="ts">
import { CloseCircleIcon, WalletCheckIcon } from '@morphemeicons/vue/iconsax/bulk'
import { NoteIcon, UserEditIcon } from '@morphemeicons/vue/iconsax/linear'
import type { StatisticCardProps } from '~/components/app/statistic/StatisticCard.vue'

const statisticItems = ref<StatisticCardProps[]>([
  {
    title: 'Baru Diajukan',
    value: 100,
    icon: NoteIcon,
    color: 'blue',
  },
  {
    title: 'Sedang Ditinjau',
    value: 100,
    icon: UserEditIcon,
    color: 'orange',
  },
  {
    title: 'Disetujui',
    value: 100,
    icon: WalletCheckIcon,
    color: 'green',
  },
  {
    title: 'Ditolak',
    value: 100,
    icon: CloseCircleIcon,
    color: 'red',
  },

])
</script>

<template>
  <div class="flex-1 space-y-6">
    <div
      class="flex flex-col lg:flex-row gap-4 lg:items-center justify-between space-y-2"
    >
      <h2 class="text-3xl font-bold tracking-tight">
        Dashboard
      </h2>
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button>Download</Button>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatisticCard
        v-for="statistic in statisticItems"
        :key="statistic.title"
        :title="statistic.title"
        :value="statistic.value"
        :icon="statistic.icon"
        :color="statistic.color"
      />
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <OverviewCard />
      <RecentSalesCard />
    </div>
  </div>
</template>
