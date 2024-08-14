import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import Sidebar from '~/components/app/sidebar/Sidebar.vue'

mockComponent('Sidebar', () => import('~/components/app/sidebar/Sidebar.vue'))

describe('sidebar', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(Sidebar, {
      props: {

      },
    })

    expect(component).toBeTruthy()
  })
})
