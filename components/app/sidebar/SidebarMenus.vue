<script setup lang="ts">
const { menus } = defineProps<{
  menus: SidebarMenu[]
}>()

const layout = useLayoutStore()

export interface SidebarMenu {
  label: string
  icon?: string
  to?: string
  children?: SidebarMenu[]
}
</script>

<template>
  <template v-for="menu in menus" :key="menu.label">
    <Accordion v-if="menu.children" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <HorizontalMenu
            :label="menu.label"
            :icon="menu.icon"
            :is-active="menu.to === $route.path"
            @click="layout.toggleSidebar()"
          />
        </AccordionTrigger>
        <AccordionContent>
          <HorizontalMenu
            v-for="child in menu.children"
            :key="child.label"
            :to="child.to"
            :label="child.label"
            :is-active="menu.to === $route.path"
            @click="layout.toggleSidebar()"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <HorizontalMenu
      v-else
      :label="menu.label"
      :icon="menu.icon"
      :to="menu.to"
      :is-active="menu.to === $route.path"
      @click="layout.toggleSidebar()"
    />
  </template>
</template>
