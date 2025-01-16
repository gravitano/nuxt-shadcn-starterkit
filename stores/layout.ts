export const useLayoutStore = defineStore('layout', () => {
  const isSidebarOpen = ref(true)

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
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
    openSidebar,
    toggleSidebar,
    closeSidebar,
  }
}, {
  persist: true,
})
