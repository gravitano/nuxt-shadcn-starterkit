<script setup lang="ts">
import { mainMenus, secondaryMenus } from '~/constants/menus'

const layout = useLayoutStore()

const isCollapsed = ref(false)
</script>

<template>
  <div class="flex flex-col lg:flex-row w-full max-w-full min-h-svh bg-gray-100 dark:bg-transparent">
    <Sidebar
      v-model:open="layout.isSidebarOpen"
    >
      <NuxtLink to="/" class="block px-5 mt-5">
        <NuxtImg
          src="/logo.png"
          alt="GITS"
          width="142"
          height="32"
          class="mb-4"
        />
      </NuxtLink>

      <SidebarSearch />

      <div class="flex-grow flex-1 overflow-y-auto px-5 mt-4">
        <Nav
          :is-collapsed="isCollapsed"
          :links="mainMenus"
        />
      </div>

      <div class="px-5 space-y-4">
        <Nav
          :is-collapsed="isCollapsed"
          :links="secondaryMenus"
        />

        <SidebarUsedSpace :progress="75" />
      </div>

      <Separator class="mt-5" />

      <SidebarUserProfileCard class="p-4" />
    </Sidebar>

    <div
      class="flex-grow transition-all duration-300"
      :class="[
        {
          'lg:ml-[320px]': layout.isSidebarOpen,
        },
      ]"
    >
      <NavigationBar />
      <div class="p-4 lg:px-8 lg:py-6">
        <slot />
      </div>
    </div>
  </div>
</template>
