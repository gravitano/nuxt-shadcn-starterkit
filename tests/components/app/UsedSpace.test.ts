import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import UsedSpace from '~/components/app/UsedSpace.vue'

mockComponent('UsedSpace', () => import('~/components/app/UsedSpace.vue'))

describe('usedSpace.vue', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(UsedSpace, {
      props: {
        progress: 50,
      },
    })

    expect(component.text()).toContain('Used space')
    expect(component.text()).toContain('50%')
    expect(component.text()).toContain('Dismiss')
    expect(component.text()).toContain('Upgrade plan')
  })
})
