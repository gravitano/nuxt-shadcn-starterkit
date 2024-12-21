<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export interface DeleteModalProps {
  title?: string
  message?: string
  cancelText?: string
  submitText?: string
  loading?: boolean
}

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<DeleteModalProps>(), {
  title: 'Hapus',
  message: 'Apakah anda yakin ingin menghapus data ini?',
  cancelText: 'Batal',
  submitText: 'Hapus',
})

const emit = defineEmits<{
  submit: []
}>()

const modelValue = defineModel<boolean>({
  default: false,
})
</script>

<template>
  <Dialog v-model:open="modelValue">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[425px] bg-[url(/images/bg-pattern-circle.svg)] bg-no-repeat bg-left bg-contain"
    >
      <DialogHeader>
        <div
          class="bg-red-50 rounded-full size-12 flex items-center justify-center mb-4"
        >
          <Icon
            name="lucide:trash-2"
            size="24"
            class="text-red-500"
          />
        </div>
        <DialogTitle>
          {{ title }}
        </DialogTitle>
        <DialogDescription>
          {{ message }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex gap-4 items-center justify-center">
        <DialogClose as-child>
          <Button
            variant="outline"
            class="flex-grow"
            :disabled="loading"
          >
            {{ cancelText }}
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          class="flex-grow"
          :loading="loading"
          @click="emit('submit')"
        >
          {{ submitText }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
