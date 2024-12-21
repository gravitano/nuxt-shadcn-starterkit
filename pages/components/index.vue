<script setup lang="ts">
const components = [
  {
    title: 'Button',
    to: '/components/button',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-4 font-bold text-xl">
      Components
    </h1>

    <ul>
      <li v-for="component in components" :key="component.title">
        <Button
          variant="link"
          as-child
          class="text-sm font-semibold"
        >
          <NuxtLink :to="component.to">
            {{ component.title }}
          </NuxtLink>
        </Button>
      </li>
    </ul>
  </div>
</template>
