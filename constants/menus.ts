import type { LinkProp } from '@/components/app/Nav.vue'

function activeVariant(path: string, isInclude = true) {
  const route = useRoute()
  const activeVariant = isInclude ? route.path.includes(path) : route.path === path
  return activeVariant ? 'default' : 'ghost'
}

export const mainMenus = computed<LinkProp[]>(() => {
  return [
    {
      title: 'Home',
      label: '128',
      icon: 'lucide:inbox',
      variant: activeVariant('/', false),
      to: '/',
    },
    // {
    //   title: 'Dashboard',
    //   label: '9',
    //   icon: 'lucide:file',
    //   variant: activeVariant('/dashboard'),
    // },
    // {
    //   title: 'Projects',
    //   label: '',
    //   icon: 'lucide:send',
    //   variant: activeVariant('/projects'),
    // },
    {
      title: 'Tasks',
      label: '23',
      icon: 'lucide:archive',
      variant: activeVariant('/tasks'),
      to: '/tasks',
    },
    // {
    //   title: 'Reporting',
    //   label: '',
    //   icon: 'lucide:trash',
    //   variant: activeVariant('/reports'),
    // },
    // {
    //   title: 'Users',
    //   label: '',
    //   icon: 'lucide:archive',
    //   variant: activeVariant('/users'),
    // },
    {
      title: 'Components',
      label: '',
      icon: 'lucide:layers',
      variant: activeVariant('/components'),
      to: '/components',
    },
  ]
})

export const secondaryMenus: LinkProp[] = [
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
