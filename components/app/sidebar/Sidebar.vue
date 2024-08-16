<script setup lang="ts">
const isOpen = defineModel<boolean>('open', {
  default: false,
})
</script>

<template>
  <!-- overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    @click="isOpen = false"
  />

  <aside
    class="w-[320px] bg-sidebar dark:text-foreground border-r border-app-secondary dark:border-slate-800 h-svh flex flex-col fixed left-auto lg:left-0 top-0 z-40 transition-transform duration-300 ease-in-out"
    :class="[
      {
        '-translate-x-full': !isOpen,
      },
    ]"
  >
    <slot />
  </aside>
</template>
