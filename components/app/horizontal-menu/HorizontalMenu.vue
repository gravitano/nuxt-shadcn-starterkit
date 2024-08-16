<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  to?: string
  isActive?: boolean
}>()
</script>

<template>
  <Button
    :variant="isActive ? 'secondary' : 'ghost'"
    as-child
    class="w-full justify-start"
  >
    <NuxtLink :to="to" class="flex gap-3 items-center w-full">
      <Icon
        v-if="icon"
        :name="icon"
        size="24"
        :class="{
          'text-icon': !isActive,
        }"
      />
      <slot>
        <span>
          {{ label }}
        </span>
      </slot>
    </NuxtLink>
  </Button>
</template>
