<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
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
  yup
    .object({
      name: yup.string().min(2).max(50).label('Name'),
      email: yup.string().email().min(2).max(50).label('Email'),
      password: yup.string().required().min(6).label('Password'),
      passwordConfirmation: yup.string().required().oneOf([yup.ref('password')], 'Password must match').label('Password Confirmation'),
      isAgree: yup.boolean().required().oneOf([true], 'You must agree to the terms and conditions'),
    }),
)

const { handleSubmit, meta } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((_values) => {
  toast.success('Register success')
  navigateTo('/auth/login')
})
</script>

<template>
  <div class="w-[500px]">
    <NuxtImg src="/logo.png" alt="Logo" class="mb-6 w-[150px]" fit="center" />

    <div class="space-y-2 mb-6">
      <h1 class="text-2xl font-semibold text-app-primary dark:text-foreground">
        Register
      </h1>
      <p class="text-sm text-muted-foreground">
        Sudah punya akun?
        <Button as-child variant="link" class="px-0">
          <NuxtLink to="/auth/login" class="text-app-primary">
            Masuk
          </NuxtLink>
        </Button>
      </p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Masukan nama lengkap" v-bind="componentField" />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Masukan email"
              v-bind="componentField"
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Kata Sandi</FormLabel>
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

      <FormField v-slot="{ componentField }" name="passwordConfirmation">
        <FormItem>
          <FormLabel>Konfirmasi Kata Sandi</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Masukan konfirmasi kata sandi"
              v-bind="componentField"
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- remember me -->
      <div class="flex justify-between gap-4 items-center">
        <FormField v-slot="{ value, handleChange }" name="isAgree">
          <FormItem>
            <div class="flex items-start gap-2">
              <FormControl>
                <Checkbox :checked="value" @update:checked="handleChange" />
              </FormControl>
              <FormLabel>
                Saya setuju dengan syarat dan ketentuan yang berlaku
              </FormLabel>
            </div>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <Button type="submit" class="w-full" :disabled="!meta.valid">
        Register
      </Button>
    </form>
  </div>
</template>
