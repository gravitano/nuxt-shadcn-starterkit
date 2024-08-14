<script setup lang="ts"></script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Button
    </h1>

    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center gap-1">
              <BreadcrumbEllipsis class="h-4 w-4" />
              <span class="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <NuxtLink to="/components">
              Components
            </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <Card>
      <CardHeader>Default</CardHeader>
      <CardContent class="space-y-4">
        <div class="space-x-2">
          <Button>Default</Button>
          <Button variant="destructive">
            Destructive
          </Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="outline">
            Outline
          </Button>
          <Button variant="ghost">
            Ghost
          </Button>
          <Button variant="link">
            Link
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>Size</CardHeader>
      <CardContent class="flex items-end gap-2">
        <Button size="sm">
          sm
        </Button>
        <Button> default </Button>
        <Button size="lg">
          lg
        </Button>
        <Button size="icon">
          <Icon name="ph:plus" />
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>State</CardHeader>
      <CardContent class="flex items-end gap-2">
        <Button> Default </Button>
        <Button loading>
          Loading
        </Button>
        <Button disabled>
          Disabled
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
