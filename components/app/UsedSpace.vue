<script setup lang="ts">
const { progress = 0 } = defineProps<{
  progress: number
}>()

const isCollapsed = ref(false)
</script>

<template>
  <Card v-if="!isCollapsed" class="bg-card">
    <div
      class="pl-6 pr-2 pt-2 pb-2 flex justify-between items-center gap-4 w-full"
    >
      <div class="font-semibold text-sm">
        Used space
      </div>
      <Button
        variant="ghost"
        class="rounded-full"
        @click="isCollapsed = !isCollapsed"
      >
        <Icon name="ph:x" />
      </Button>
    </div>
    <CardContent class="text-sm">
      Your team has used {{ progress }}% of your available space. Need more?
      <Progress :model-value="progress" class="mt-4 h-2 bg-gray-200" />
    </CardContent>
    <CardFooter class="px-2">
      <Button variant="ghost" @click="isCollapsed = !isCollapsed">
        Dismiss
      </Button>
      <a href="#" class="text-sm text-primary font-semibold">
        Upgrade plan
      </a>
    </CardFooter>
  </Card>
</template>
