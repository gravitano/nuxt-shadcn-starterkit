import { setLocale } from 'yup'
import * as id from '~/locales/yup'

export default defineNuxtPlugin(() => {
  setLocale(id)
})
