import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().public.apiUrl
  const path = event.path.replace(/^\/api\//, '') // /api/users -> users
  const target = joinURL(proxyUrl, path)

  console.log('Proxying request to:', target)

  // proxy it!
  return proxyRequest(event, target)
})
