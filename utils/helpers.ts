import type { AxiosError } from 'axios'
import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'vue-sonner'
import type { ResponseValidationError } from '~/types/general'

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
    return err.response?.data?.message ?? err.message
  }

  return err.message
}

export function handleValidationError(
  error: Error,
  setFieldError: (field: any, value: string) => void,
) {
  const err = error as AxiosError<ResponseValidationError>
  const validationErrors = err.response?.data?.errors ?? []

  if (validationErrors) {
    validationErrors.forEach((error) => {
      setFieldError(error.field, error.message)
    })
  }
  else {
    toast.error(err.response?.data?.message ?? 'Something went wrong')
  }
}

export function displayValidationErrors(
  error: Error,
) {
  const err = error as AxiosError<ResponseValidationError>
  const validationErrors = err.response?.data?.errors ?? []

  if (validationErrors) {
    validationErrors.forEach((error) => {
      toast.error(error.message)
    })
  }
  else {
    toast.error(err.response?.data?.message ?? 'Something went wrong')
  }
}

export function toCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function decodeHtmlEntities(str: string) {
  const parser = new DOMParser()
  const decodedString = str.replace(/\\u([\dA-F]{4})/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
  const doc = parser.parseFromString(decodedString, 'text/html')
  return doc.documentElement.textContent ?? ''
}

export function validateMaxHtmlContent(value: string, maxCharacters: number) {
  if (!value)
    return true

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = value
  const textContent = tempDiv.textContent || ''

  return textContent.length <= maxCharacters
}

export function formatDate(date: string | Date, format = 'DD MMMM YYYY') {
  return dayjs(date).format(format)
}

/**
 * Get duration between two dates
 *
 * @param start string
 * @param end string
 * @returns number
 */
export function getDuration(start: string, end: string) {
  const startDate = dayjs(start)
  const endDate = dayjs(end)

  const diffDays = endDate.diff(startDate, 'days')

  return diffDays
}
