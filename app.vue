<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

const appConfig = useAppConfig()

useHead({
  title: appConfig.app.name,
  meta: [
    {
      name: 'description',
      content: appConfig.app.description,
    },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster class="pointer-events-auto" />
</template>
