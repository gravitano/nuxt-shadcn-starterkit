<script setup lang="ts">
export interface SpinnerProps {
  size?: string
  icon?: string
  position?: 'absolute' | 'relative'
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: '20',
  icon: 'ph:spinner',
  position: 'relative',
})
</script>

<template>
  <div
    class="flex justify-center items-center z-[5]"
    :class="[
      {
        'absolute inset-0': position === 'absolute',
        'relative': position === 'relative',
      },
    ]"
  >
    <Icon
      :name="props.icon"
      :size="size"
      class="animate-spin"
    />
  </div>
</template>
