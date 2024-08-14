<script setup lang="ts">
import type { LinkProp } from '@/components/app/Nav.vue'

const route = useRoute()

function isActive(path: string, isInclude = true) {
  const isActive = isInclude ? route.path.includes(path) : route.path === path
  return isActive ? 'default' : 'ghost'
}

const mainMenus = computed<LinkProp[]>(() => {
  return [
    {
      title: 'Home',
      label: '128',
      icon: 'lucide:inbox',
      variant: isActive('/', false),
      to: '/',
    },
    // {
    //   title: 'Dashboard',
    //   label: '9',
    //   icon: 'lucide:file',
    //   variant: isActive('/dashboard'),
    // },
    // {
    //   title: 'Projects',
    //   label: '',
    //   icon: 'lucide:send',
    //   variant: isActive('/projects'),
    // },
    {
      title: 'Tasks',
      label: '23',
      icon: 'lucide:archive',
      variant: isActive('/tasks'),
      to: '/tasks',
    },
    // {
    //   title: 'Reporting',
    //   label: '',
    //   icon: 'lucide:trash',
    //   variant: isActive('/reports'),
    // },
    // {
    //   title: 'Users',
    //   label: '',
    //   icon: 'lucide:archive',
    //   variant: isActive('/users'),
    // },
    {
      title: 'Components',
      label: '',
      icon: 'lucide:layers',
      variant: isActive('/components'),
      to: '/components',
    },
  ]
})

const secondaryMenus: LinkProp[] = [
  {
    title: 'Support',
    label: '128',
    icon: 'lucide:circle-help',
    variant: 'ghost',
  },
  {
    title: 'Settings',
    label: '9',
    icon: 'lucide:settings',
    variant: 'ghost',
  },
]

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
