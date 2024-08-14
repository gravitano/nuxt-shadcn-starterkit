import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import MetricCard from '~/components/app/MetricCard.vue'

mockComponent('MetricCard', () => import('~/components/app/MetricCard.vue'))

describe('metricCard.vue', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(MetricCard, {
      props: {
        metric: {
          title: 'Total Revenue',
          value: '$45,231.89',
          percentage: '+20.1% from last month',
          icon: 'ph:currency-dollar',
        },
      },
    })

    expect(component.text()).toContain('Total Revenue')
    expect(component.text()).toContain('$45,231.89')
    expect(component.text()).toContain('+20.1% from last month')
  })
})
