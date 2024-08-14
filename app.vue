<script setup lang="ts">
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
</template>
