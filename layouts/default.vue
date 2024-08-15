<script setup lang="ts">
import { mainMenus, secondaryMenus } from '~/constants/menus'

const isCollapsed = ref(false)
</script>

<template>
  <div class="flex flex-col lg:flex-row w-full max-w-full">
    <Sidebar>
      <NuxtLink to="/" class="block px-5 mt-5">
        <NuxtImg
          src="/logo.png"
          alt="GITS"
          width="142"
          height="32"
          class="mb-4"
        />
      </NuxtLink>

      <div class="px-5">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center h-full p-3">
            <Icon name="ph:magnifying-glass" size="20" class="text-gray-500" />
          </div>
          <Input placeholder="Search" class="pl-10" />
        </div>
      </div>

      <div class="flex-grow flex-1 overflow-y-auto px-5">
        <Nav :is-collapsed="isCollapsed" :links="mainMenus" />
      </div>

      <div class="px-5">
        <Nav :is-collapsed="isCollapsed" :links="secondaryMenus" />

        <UsedSpace :progress="75" />
      </div>

      <Separator class="mt-5" />

      <UserProfileCard class="p-4" />
    </Sidebar>

    <div class="w-full lg:w-auto flex-grow lg:max-w-[calc(100%-280px)]">
      <NavigationBar />
      <div class="p-4 lg:px-8 lg:py-6">
        <slot />
      </div>
    </div>
  </div>
</template>
