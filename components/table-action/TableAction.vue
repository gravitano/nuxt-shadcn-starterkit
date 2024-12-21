<script setup lang="ts">
import { NuxtLink } from '#components'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoCircleIcon, Pencil02Icon, Trash01Icon } from '@morphemeicons/vue/untitled'

import { cn } from '~/lib/utils'
import { Button } from '@/components/ui/button'

export interface TableActionProps {
  viewLink?: string
  editLink?: string
  onDelete?: () => void
  onView?: () => void
  onEdit?: () => void
  viewText?: string
  editText?: string
  deleteText?: string
  viewIcon?: any
  class?: string
  align?: 'left' | 'center' | 'right'
}

const {
  viewLink,
  editLink,
  onDelete,
  onView,
  onEdit,
  viewText = 'View',
  editText = 'Edit',
  deleteText = 'Delete',
  viewIcon = InfoCircleIcon,
  class: className,
  align = 'center',
} = defineProps<TableActionProps>()

defineSlots<{
  default: (props: object) => void
  before: (props: object) => void
  after: (props: object) => void
}>()
</script>

<template>
  <slot>
    <div
      :class="cn(
        'flex items-center gap-1 w-full',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
        },
        className,
      )"
    >
      <slot name="before" />
      <Tooltip
        v-if="viewLink || onView"
      >
        <TooltipTrigger as-child>
          <Button
            type="button"
            variant="icon"
            class="shrink-0"
            :as-child="!!viewLink"
            @click="onView"
          >
            <NuxtLink v-if="viewLink" :to="viewLink">
              <component :is="viewIcon" class="size-5" />
            </NuxtLink>
            <component
              :is="viewIcon"
              v-else
              class="size-5"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ viewText }}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip
        v-if="editLink || onEdit"
      >
        <TooltipTrigger as-child>
          <Button
            type="button"
            variant="icon"
            class="shrink-0"
            as-child
            @click="onEdit"
          >
            <NuxtLink :to="editLink">
              <Pencil02Icon class="size-5" />
            </NuxtLink>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ editText }}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip v-if="onDelete">
        <TooltipTrigger as-child>
          <Button
            type="button"
            class="shrink-0"
            variant="icon"
            @click="onDelete"
          >
            <Trash01Icon class="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ deleteText }}</p>
        </TooltipContent>
      </Tooltip>
      <slot name="after" />
    </div>
  </slot>
</template>
