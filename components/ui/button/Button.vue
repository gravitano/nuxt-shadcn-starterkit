<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  shadow?: ButtonVariants['shadow']
  class?: HTMLAttributes['class']
  loading?: boolean
  onClick?: HTMLAttributes['onClick']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, shadow }), props.class)"
    @click="onClick"
  >
    <Spinner v-if="loading" class="mr-3" />
    <slot />
  </Primitive>
</template>
