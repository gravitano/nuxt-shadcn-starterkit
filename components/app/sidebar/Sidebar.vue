<script setup lang="ts">
const layout = useLayoutStore()
const { isSidebarOpen } = storeToRefs(layout)
</script>

<template>
  <!-- overlay -->
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    @click="layout.toggleSidebar()"
  />

  <aside
    class="w-[320px] bg-sidebar dark:bg-sidebar-foreground dark:text-foreground border-r border-app-secondary dark:border-slate-800 h-svh flex flex-col fixed left-auto lg:left-0 top-0 z-40 transition-transform duration-300 ease-in-out"
    :class="[
      {
        '-translate-x-full': !isSidebarOpen,
      },
    ]"
  >
    <slot />
  </aside>
</template>
