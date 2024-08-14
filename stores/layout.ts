export const useLayoutStore = defineStore('layout', () => {
  const isSidebarOpen = ref(false)
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const hideSidebar = () => {
    isSidebarOpen.value = false
  }

  const onWindowResize = () => {
    if (window.innerWidth > 1024) {
      isSidebarOpen.value = true
    }
    else {
      isSidebarOpen.value = false
    }
  }

  onMounted(() => {
    onWindowResize()
    window.addEventListener('resize', onWindowResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize)
  })

  return {
    isSidebarOpen,
    toggleSidebar,
    hideSidebar,
  }
}, {
  persist: true,
})
