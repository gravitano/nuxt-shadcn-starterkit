<script setup lang="ts">
import { useCycleList } from '@vueuse/core'
import { Menu01Icon } from '@morphemeicons/vue/untitled'

const layout = useLayoutStore()
const colorMode = useColorMode()
const { state, next } = useCycleList(['system', 'light', 'dark'])

function toggleColorMode() {
  next()
  colorMode.preference = state.value
}

const colorIcon: Record<string, string> = {
  system: 'ph:laptop',
  light: 'ph:sun',
  dark: 'ph:moon-stars',
}

const currentIcon = computed(() => colorIcon[state.value] ?? 'ph:laptop')
</script>

<template>
  <header
    class="bg-background border-b h-16 px-4 lg:px-8 flex items-center gap-4 justify-between sticky top-0 z-10"
  >
    <div class="flex items-center gap-4">
      <Button
        aria-label="Menu"
        class="w-10 h-10 p-0 -ml-2"
        variant="ghost"
        @click="layout.toggleSidebar()"
      >
        <Menu01Icon class="size-6 text-[hsl(221,13%,46%)]" />
      </Button>
      <!-- <div class="font-semibold text-lg hidden lg:block">Admin</div> -->
    </div>
    <nav class="space-x-2">
      <Button variant="ghost" class="size-8 p-0" aria-label="Notification">
        <Icon size="20" name="lucide:bell" />
      </Button>
      <Button
        class="size-8 p-0"
        aria-label="Dark Mode"
        variant="ghost"
        @click="toggleColorMode"
      >
        <Icon size="20" :name="currentIcon" />
      </Button>
    </nav>
  </header>
</template>
