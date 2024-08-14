import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import NavigationBar from '~/components/app/navigation-bar/NavigationBar.vue'

mockComponent('NavigationBar', () => import('~/components/app/navigation-bar/NavigationBar.vue'))

describe('navigationBar', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(NavigationBar, {
      props: {
      },
    })

    expect(component).toBeTruthy()
  })
})
