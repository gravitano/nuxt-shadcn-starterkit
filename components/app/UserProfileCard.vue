<script setup lang="ts">
const auth = useAuthStore()

function logout() {
  auth.logout()
  navigateTo('/auth/login')
}
</script>

<template>
  <div
    v-if="auth.user"
    class="flex items-center gap-4"
  >
    <Avatar>
      <AvatarFallback>{{ auth.user.name }}</AvatarFallback>
    </Avatar>
    <div class="flex-grow">
      <h3 class="text-sm font-semibold">
        {{ auth.user.name }}
      </h3>
      <div class="text-sm text-gray-500 truncate">
        {{ auth.user.email }}
      </div>
    </div>
    <div>
      <Button variant="ghost" @click="logout">
        <Icon name="ph:sign-out" size="20" />
      </Button>
    </div>
  </div>
</template>
