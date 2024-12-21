<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { navVariants } from './index'
import { cn } from '~/lib/utils'

export interface NavItemProps {
  /**
   * Path of the menu
   */
  to?: string
  /**
   * Title of the menu
   */
  title: string
  /**
   * Icon of the menu. Can be a string or a component
   */
  icon?: string | Component
  /**
   * Additional class for the menu
   */
  class?: HTMLAttributes['class']
  /**
   * Children of the menu
   */
  children?: NavItemProps[]
  /**
   * If true, the menu will only be active if the path is exactly the same
   */
  exact?: boolean
  /**
   * Roles that are allowed to access this menu
   */
  allowedRoles?: string[]
  label?: string
}

const props = withDefaults(defineProps<NavItemProps>(), {
  exact: false,
})

const route = useRoute()

function isActive(path: string, exact = false) {
  const isPathEqual = route.path === path
  const isPathInclude = route.path.includes(path)

  if (props.exact || exact) {
    return isPathEqual
  }

  return isPathEqual || isPathInclude
}

function isActiveOnChild(children: NavItemProps[]) {
  return children.some(child => isActive(child.to!, child.exact))
}

const variant = computed(() => {
  if (props.children) {
    return isActiveOnChild(props.children) ? 'active' : 'default'
  }

  return isActive(props.to!) ? 'active' : 'default'
})
</script>

<template>
  <NuxtLink
    :to="to"
    :class="cn(navVariants({ variant: 'default' }), 'justify-start', props.class)"
    :exact-active-class="cn(navVariants({ variant }))"
  >
    <div class="size-6">
      <Icon
        v-if="typeof icon === 'string'"
        :name="icon"
        :size="24"
      />
      <component
        :is="icon"
        v-else
        class="size-6 text-current"
      />
    </div>
    <div class="text-wrap flex-1">
      {{ title }}
    </div>
    <Badge
      v-if="label"
      variant="secondary"
    >
      {{ label }}
    </Badge>
  </NuxtLink>
</template>
