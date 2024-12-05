import axios from 'axios'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  axios.interceptors.request.use((config) => {
    // add token to header
    if (token.value)
      config.headers.Authorization = `Bearer ${token.value}`

    return config
  })

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        auth.logout()
      }

      return Promise.reject(error)
    },
  )
})
