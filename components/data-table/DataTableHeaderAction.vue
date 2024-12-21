<script setup lang="ts">
interface Props {
  align?: 'left' | 'center' | 'right'
}

const {
  align = 'center',
} = defineProps<Props>()
</script>

<template>
  <div
    class="text-sm font-bold uppercase px-2"
    :class="{
      'text-center': align === 'center',
      'text-left': align === 'left',
      'text-right': align === 'right',
    }"
  >
    Aksi
  </div>
</template>
