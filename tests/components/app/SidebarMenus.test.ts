import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import SidebarMenus from '~/components/app/sidebar/SidebarMenus.vue'

mockComponent('SidebarMenus', () => import('~/components/app/sidebar/SidebarMenus.vue'))

describe('sidebarMenus', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(SidebarMenus, {
      props: {
        menus: [
          {
            label: 'Dashboard',
            icon: 'mdi-view-dashboard',
            to: '/dashboard',
          },
          {
            label: 'Users',
            icon: 'mdi-account-group',
            to: '/users',
          },
          {
            label: 'Roles',
            icon: 'mdi-account-key',
            to: '/roles',
          },
          {
            label: 'Permissions',
            icon: 'mdi-lock',
            to: '/permissions',
          },
          {
            label: 'Settings',
            icon: 'mdi-cog',
            children: [
              {
                label: 'General',
                to: '/settings/general',
              },
              {
                label: 'Account',
                to: '/settings/account',
              },
              {
                label: 'Security',
                to: '/settings/security',
              },
            ],
          },
        ],
      },
    })

    expect(component).toBeTruthy()
    expect(component.text()).toContain('Dashboard')
    expect(component.text()).toContain('Users')
    expect(component.text()).toContain('Roles')
    expect(component.text()).toContain('Permissions')
  })
})
