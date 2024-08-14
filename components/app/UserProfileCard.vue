<script setup lang="ts">
const auth = useAuthStore()

function logout() {
  auth.logout()
  navigateTo('/auth/login')
}

const userInitial = computed(() => {
  if (!auth.user)
    return ''

  return auth.user.name
    .split(' ')
    .slice(0, 2)
    .map(name => name[0])
    .join('')
})
</script>

<template>
  <div
    v-if="auth.user"
    class="flex items-center gap-4"
  >
    <Avatar>
      <AvatarFallback>{{ userInitial }}</AvatarFallback>
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
