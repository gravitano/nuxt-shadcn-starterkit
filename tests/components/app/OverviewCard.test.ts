import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import OverviewCard from '~/components/overview/OverviewCard.vue'

mockComponent('OverviewCard', () => import('~/components/overview/OverviewCard.vue'))

describe('overviewCard.vue', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(OverviewCard, {
      props: {
      },
    })

    expect(component.text()).toContain('Overview')
  })
})
