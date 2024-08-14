import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import RecentSalesCard from '~/components/app/RecentSalesCard.vue'

mockComponent('RecentSalesCard', () => import('~/components/app/RecentSalesCard.vue'))

describe('recentSalesCard.vue', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(RecentSalesCard, {
      props: {
      },
    })

    expect(component.text()).toContain('Recent Sales')
  })
})
