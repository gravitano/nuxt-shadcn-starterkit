<script lang="ts" setup>
import { ChevronDownIcon } from '@morphemeicons/vue/untitled'
import type { NavItemProps } from './NavItem.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface NavProps {
  links: NavItemProps[]
  collapsible?: boolean
}

const {
  links,
} = defineProps<NavProps>()

const accordionValue = ref<string | string[]>([])
const route = useRoute()

function isPathActive(path: string) {
  return route.path === path || route.path.includes(path)
}

const currentActiveLink = computed(() => {
  return links.find((link) => {
    if (link.children) {
      return link.children.some(child => isPathActive(child.to!))
    }

    return isPathActive(link.to!)
  })
})

watchEffect(() => {
  if (currentActiveLink.value) {
    accordionValue.value = currentActiveLink.value.title
  }
})

// const auth = useAuthStore()

function canAccessMenu(link: NavItemProps) {
  // if (link.allowedRoles) {
  //   return link.allowedRoles.includes(normalizeRoleName(auth.currentRole))
  // }

  return true
}
</script>

<template>
  <Accordion
    v-model="accordionValue"
    type="single"
    collapsible
    class="space-y-1"
  >
    <template v-for="(link, linkIndex) in links" :key="linkIndex">
      <template v-if="link.children">
        <AccordionItem
          v-if="canAccessMenu(link)"
          :value="link.title"
        >
          <AccordionTrigger class="py-0">
            <NavItem
              :to="link.to"
              :title="link.title"
              :icon="link.icon"
              :exact="link.exact"
              :children="link.children"
              :label="link.label"
            />
            <template #icon>
              <ChevronDownIcon
                class="text-white h-4 w-4 shrink-0 transition-transform duration-200"
              />
            </template>
          </AccordionTrigger>
          <AccordionContent class="pt-2">
            <Nav :links="link.children" />
          </AccordionContent>
        </AccordionItem>
      </template>
      <template v-else>
        <NavItem
          v-if="canAccessMenu(link)"
          :to="link.to"
          :title="link.title"
          :icon="link.icon"
          :exact="link.exact"
          :children="link.children"
          :label="link.label"
        />
      </template>
    </template>
  </Accordion>
</template>
