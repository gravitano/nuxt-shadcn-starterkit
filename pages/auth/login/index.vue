<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

definePageMeta({
  layout: 'auth',
})

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(2).max(50),
    password: z.string(),
    rememberMe: z.boolean().optional(),
  }),
)

const { handleSubmit, meta } = useForm({
  validationSchema: formSchema,
})

const auth = useAuthStore()

const onSubmit = handleSubmit((values) => {
  // console.log('Form submitted!', values);
  const user: AuthUser = {
    id: 1,
    name: 'John Doe',
    email: values.email,
    role: 'user',
  }
  const token = Math.random().toString(36).substring(2)
  auth.login(user, token)
  navigateTo('/')
})
</script>

<template>
  <div class="w-[500px]">
    <NuxtImg src="/logo.png" alt="Logo" class="mb-6 w-[150px]" fit="center" />

    <div class="space-y-2 mb-6">
      <h1 class="text-[28px]/[42px] font-semibold text-app-primary dark:text-foreground">
        Masuk
      </h1>
      <p class="text-muted-foreground text-base/6 font-medium">
        Silahkan masuk, untuk mengakses semua fitur yang ada!
      </p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>
            Email
            <span class="text-destructive font-semibold">*</span>
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Masukan email Anda"
              v-bind="componentField"
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>
            Kata Sandi
            <span class="text-destructive font-semibold">*</span>
          </FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Masukan password"
              v-bind="componentField"
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- remember me -->
      <div class="flex justify-between gap-4 items-center">
        <FormField v-slot="{ value, handleChange }" name="rememberMe">
          <FormItem>
            <div class="flex items-center gap-2">
              <FormControl>
                <Checkbox :checked="value" @update:checked="handleChange" />
              </FormControl>
              <FormLabel class="font-regular">
                Ingat Saya
              </FormLabel>
            </div>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <Button as-child variant="link">
          <NuxtLink to="/auth/forgot-password">
            Lupa kata sandi?
          </NuxtLink>
        </Button>
      </div>

      <Button type="submit" class="w-full" :disabled="!meta.valid">
        Masuk
      </Button>

      <Separator />

      <div class="text-sm">
        Belum punya akun?
        <Button as-child variant="link" class="p-0">
          <NuxtLink to="/auth/register">
            Daftar sekarang
          </NuxtLink>
        </Button>
      </div>
    </form>
  </div>
</template>
