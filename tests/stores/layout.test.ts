import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLayoutStore } from '~/stores/layout'

describe('useAuth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default values', () => {
    const auth = useLayoutStore()
    expect(auth.isSidebarOpen).toBe(false)
  })

  it('should toggle sidebar correctly', () => {
    const auth = useLayoutStore()

    auth.toggleSidebar()

    expect(auth.isSidebarOpen).toBe(true)

    auth.toggleSidebar()

    expect(auth.isSidebarOpen).toBe(false)
  })

  it('should open sidebar correctly', () => {
    const auth = useLayoutStore()

    auth.openSidebar()

    expect(auth.isSidebarOpen).toBe(true)
  })

  it('should close sidebar correctly', () => {
    const auth = useLayoutStore()

    auth.openSidebar()
    auth.closeSidebar()

    expect(auth.isSidebarOpen).toBe(false)
  })
})
