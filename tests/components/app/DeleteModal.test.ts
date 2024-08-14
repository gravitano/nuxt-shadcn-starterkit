import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import DeleteModal from '~/components/app/delete-modal/DeleteModal.vue'

mockComponent('DeleteModal', () => import('~/components/app/delete-modal/DeleteModal.vue'))

describe('deleteModal', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(DeleteModal, {
      props: {
      },
    })

    expect(component).toBeTruthy()
  })
})
