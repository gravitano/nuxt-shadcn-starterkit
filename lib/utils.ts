import type { Updater } from '@tanstack/vue-table'
import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref,
) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function handleAxiosError(
  err: Error,
  setFieldError: (field: any, value: string) => void,
) {
  if (axios.isAxiosError(err)) {
    const errors = err.response?.data?.errors
    for (const error of errors) {
      setFieldError(error.key as any, error.value)
    }
  }
}

export function getErrorMessage(err: Error) {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message
  }

  return err.message
}
