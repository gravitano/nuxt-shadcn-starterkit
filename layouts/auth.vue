<script setup lang="ts">
//
</script>

<template>
  <div
    class="h-screen bg-background flex flex-col lg:flex-row gap-6 items-center"
  >
    <div
      class="hidden w-6/12 bg-primary dark:bg-background h-full lg:flex items-center justify-center px-10"
    >
      <NuxtImg
        src="/images/undraw_secure_login_pdn4.svg"
        alt="undraw_secure_login_pdn4"
        width="471.04"
        height="460.258"
        class="shrink-0 max-w-full"
      />
    </div>
    <div
      class="p-6 lg:p-0 w-full lg:w-6/12 bg-no-repeat bg-top-center h-full flex items-center justify-center"
    >
      <slot />
    </div>
  </div>
</template>
