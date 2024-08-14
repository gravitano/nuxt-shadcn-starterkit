<script setup lang="ts">
const auth = useAuthStore()

function logout() {
  auth.logout()
  navigateTo('/auth/login')
}
</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar />
    <div class="flex-grow">
      <h3 class="text-sm font-semibold">
        Olivia Rey
      </h3>
      <div class="text-sm text-gray-500">
        olivia.rey@gmail.com
      </div>
    </div>
    <div>
      <Button variant="ghost" @click="logout">
        <Icon name="ph:sign-out" size="20" />
      </Button>
    </div>
  </div>
</template>
