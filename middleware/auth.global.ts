import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // Redirect to login page if not authenticated
  if (!auth.isLoggedIn && !to.path.startsWith('/auth')) {
    toast.error('Unauthenticated', {
      description: 'You need to login to access this page.',
    })

    return navigateTo('/auth/login')
  }

  // Redirect to home page if authenticated
  if (auth.isLoggedIn && to.path.startsWith('/auth')) {
    toast.error('Authenticated', {
      description: 'You are already authenticated.',
    })

    return navigateTo('/')
  }
})
