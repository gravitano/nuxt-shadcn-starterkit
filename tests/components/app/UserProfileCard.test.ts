import { describe, expect, it } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import UserProfileCard from '~/components/app/UserProfileCard.vue'

mockComponent('UserProfileCard', () => import('~/components/app/UserProfileCard.vue'))

describe('userProfileCard', () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(UserProfileCard, {
      props: {
      },
    })

    expect(component).toBeTruthy()
  })
})