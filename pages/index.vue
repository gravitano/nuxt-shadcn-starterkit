<script setup lang="ts">
const tabs = ref([
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports', disabled: true },
  { value: 'notifications', label: 'Notifications', disabled: true },
])

const selectedTab = ref('overview')

const metrics = ref([
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    percentage: '+20.1% from last month',
    icon: 'ph:currency-dollar',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    percentage: '+180.1% from last month',
    icon: 'ph:users',
  },
  {
    title: 'Sales',
    value: '+12,234',
    percentage: '+19% from last month',
    icon: 'ph:credit-card',
  },
  {
    title: 'Active Now',
    value: '+573',
    percentage: '+201 since last hour',
    icon: 'ph:pulse',
  },
])
</script>

<template>
  <div class="flex-1 space-y-4">
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
    <Tabs v-model="selectedTab" class="space-y-4">
      <TabsList>
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :disabled="tab.disabled"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            v-for="metric in metrics"
            :key="metric.title"
            :metric="metric"
          />
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <OverviewCard />
          <RecentSalesCard />
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
