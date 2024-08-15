<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
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
  yup.object({
    email: yup.string().required().email().min(2).max(50).label('Email'),
  }),
)

const { handleSubmit, meta } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((_values) => {
  // console.log('Form submitted!', values);
  navigateTo('/auth/login')
})
</script>

<template>
  <div class="w-[360px]">
    <NuxtImg src="/logo.png" alt="Logo" class="mb-6 w-[150px]" fit="center" />

    <div class="space-y-2 mb-6">
      <h1 class="text-2xl font-semibold text-app-primary dark:text-foreground">
        Forgot Password
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your email to reset your password.
      </p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
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

      <Button type="submit" class="w-full" :disabled="!meta.valid">
        Send Reset Link
      </Button>
    </form>
  </div>
</template>
