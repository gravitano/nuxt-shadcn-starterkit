import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import TableAction from '~/components/app/TableAction.vue'

mockComponent('TableAction', () => import('~/components/app/TableAction.vue'))

describe('tableAction', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(TableAction, {
      props: {
        row: {
          original: {
            id: 1,
          },
        },
        onDelete: () => {},
      },
    })

    expect(component).toBeTruthy()
  })
})
