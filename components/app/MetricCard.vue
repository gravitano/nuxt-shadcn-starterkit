<script setup lang="ts">
defineProps<{
  metric: {
    title: string
    value: string
    percentage: string
    icon: string
  }
}>()
</script>

<template>
  <Card>
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <CardTitle class="text-sm font-medium">
        {{ metric.title }}
      </CardTitle>
      <Icon :name="metric.icon" class="text-muted-foreground size-5" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        {{ metric.value }}
      </div>
      <p class="text-xs text-muted-foreground">
        {{ metric.percentage }}
      </p>
    </CardContent>
  </Card>
</template>
