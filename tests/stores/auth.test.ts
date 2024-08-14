import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore as useAuth } from '~/stores/auth'

describe('useAuth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default values', () => {
    const auth = useAuth()
    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBeUndefined()
    expect(auth.token).toBe('')
  })

  it('should login correctly', () => {
    const auth = useAuth()
    const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' }
    const token = 'some-token'

    auth.login(user, token)

    expect(auth.isLoggedIn).toBe(true)
    expect(auth.user).toEqual(user)
    expect(auth.token).toBe(token)
  })

  it('should logout correctly', () => {
    const auth = useAuth()
    const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' }
    const token = 'some-token'

    auth.login(user, token)
    auth.logout()

    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBeUndefined()
    expect(auth.token).toBe('')
  })
})
