<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface LinkProp {
  title: string
  label?: string
  icon: string
  variant: 'default' | 'ghost'
  to?: string
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
}

defineProps<NavProps>()
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav
      class="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) of links" :key="index">
        <TooltipProvider v-if="isCollapsed">
          <Tooltip :key="`1-${index}`" :delay-duration="0">
            <TooltipTrigger as-child>
              <NuxtLink
                :to="link.to"
                :class="
                  cn(
                    buttonVariants({ variant: link.variant, size: 'icon' }),
                    'h-9 w-9',
                    link.variant === 'default'
                      && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )
                "
              >
                <Icon :name="link.icon" class="size-4" />
                <span class="sr-only">{{ link.title }}</span>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent side="right" class="flex items-center gap-4">
              {{ link.title }}
              <span v-if="link.label" class="ml-auto text-muted-foreground">
                {{ link.label }}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <NuxtLink
          v-else
          :key="`2-${index}`"
          :to="link.to"
          :class="
            cn(
              buttonVariants({ variant: link.variant, size: 'sm' }),
              link.variant === 'default'
                && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start',
            )
          "
        >
          <Icon :name="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            v-if="link.label"
            :class="
              cn(
                'ml-auto',
                link.variant === 'default' && 'text-background dark:text-white',
              )
            "
          >
            {{ link.label }}
          </span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>
