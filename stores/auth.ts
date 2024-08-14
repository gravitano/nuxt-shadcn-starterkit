export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref<AuthUser>()
  const token = ref('')

  const login = (_user: AuthUser, _token: string) => {
    isLoggedIn.value = true
    user.value = _user
    token.value = _token
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = undefined
    token.value = ''
  }

  return {
    isLoggedIn,
    user,
    token,
    login,
    logout,
  }
}, {
  persist: true,
})
