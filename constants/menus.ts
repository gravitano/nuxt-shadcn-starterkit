import type { NavItemProps } from '~/components/nav/NavItem.vue'

export const mainMenus = computed<NavItemProps[]>(() => {
  return [
    {
      title: 'Home',
      icon: 'lucide:inbox',
      to: '/',
    },
    {
      title: 'Tasks',
      icon: 'lucide:archive',
      to: '/tasks',
    },
    {
      title: 'Components',
      icon: 'lucide:layers',
      to: '/components',
    },
  ]
})

export const secondaryMenus = computed<NavItemProps[]>(() => {
  return [
    {
      title: 'Support',
      label: '128',
      icon: 'lucide:circle-help',
    },
    {
      title: 'Settings',
      label: '9',
      icon: 'lucide:settings',
    },
  ]
})
