<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const route = useRoute()
const action = route.params.action as 'create' | 'edit' | 'view'
const isView = action === 'view'
const id = route.params.id as string

const submitLabel = {
  create: 'Tambah Task',
  edit: 'Perbarui Task',
  view: 'Lihat Task',
} as const

const { data, isLoading } = useTodo(id)

const formSchema = toTypedSchema(
  yup.object({
    title: yup.string().required().min(2).max(50).label('Title'),
    completed: yup.boolean().default(false).label('Completed'),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

watch(data, (value) => {
  if (value) {
    resetForm({
      values: {
        title: value.data.title,
        completed: value.data.completed,
      },
    })
  }
})

const mutation = useCreateOrUpdateTodo()

const onSubmit = handleSubmit((values) => {
  mutation.mutate({
    id,
    body: values,
  })
})
</script>

<template>
  <div>
    <Button
      as-child
      variant="ghost"
      class="-mx-4 mb-4 font-semibold"
    >
      <NuxtLink to="/tasks">
        <Icon
          name="ph:arrow-left"
          size="20"
          class="mr-2"
        />
        Kembali
      </NuxtLink>
    </Button>

    <form class="space-y-4 mt-4" @submit="onSubmit">
      <Card>
        <CardHeader class="flex flex-row justify-between items-center gap-4">
          <CardTitle> {{ actionLabel }} Task </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <!-- title -->
          <FormField v-slot="{ componentField }" name="title">
            <FormItem class="flex items-center gap-4">
              <FormLabel class="w-full lg:w-4/12">
                Title
              </FormLabel>
              <div class="flex-grow flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="Masukan judul"
                    v-bind="componentField"
                    :disabled="isView"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>

          <!-- description -->
          <FormField v-slot="{ value, handleChange }" name="completed">
            <FormItem class="flex items-center gap-4">
              <FormLabel class="w-full lg:w-4/12">
                Completed?
              </FormLabel>
              <div class="flex-grow flex flex-col gap-2">
                <FormControl>
                  <Checkbox
                    :checked="value"
                    :disabled="isView"
                    @update:checked="handleChange"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
        </CardContent>
      </Card>

      <Card
        v-if="!isView"
        class="mt-6"
      >
        <CardFooter class="py-6 justify-end gap-4">
          <Button
            :disabled="isLoading || mutation.isPending.value"
            variant="outline"
            @click="navigateTo('/tasks')"
          >
            Batal
          </Button>
          <Button
            type="submit"
            :disabled="isLoading"
            :loading="mutation.isPending.value"
          >
            {{ submitLabel }}
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
