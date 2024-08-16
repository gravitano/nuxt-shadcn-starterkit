import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import { WalletCheckIcon } from '@morphemeicons/vue/iconsax/bulk'
import StatisticCard from '~/components/app/statistic/StatisticCard.vue'

mockComponent('StatisticCard', () => import('~/components/app/statistic/StatisticCard.vue'))

describe('statisticCard.vue', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(StatisticCard, {
      props: {
        title: 'Total Revenue',
        value: '$45,231.89',
        icon: WalletCheckIcon,
        color: 'blue',
      },
    })

    expect(component.text()).toContain('Total Revenue')
    expect(component.text()).toContain('$45,231.89')
  })
})
