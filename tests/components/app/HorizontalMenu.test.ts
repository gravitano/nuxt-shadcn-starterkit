import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import HorizontalMenu from '~/components/app/horizontal-menu/HorizontalMenu.vue'

mockComponent('HorizontalMenu', () => import('~/components/app/horizontal-menu/HorizontalMenu.vue'))

describe('horizontalMenu', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(HorizontalMenu, {
      props: {
        label: 'Menu',
      },
    })

    expect(component).toBeTruthy()
    expect(component.text()).toContain('Menu')
  })
})
