/* eslint-disable no-template-curly-in-string */

import type { LocaleObject } from 'yup'

// Based on https://github.com/jquense/yup/blob/b940eef48eb7456622ae384d0ffa7363d4fbad25/src/locale.ts
export const mixed: LocaleObject['mixed'] = {
  default: '${path} tidak valid.',
  required: '${path} harus diisi',
  defined: '${path} harus didefinisikan',
  notNull: '${path} tidak bisa nol',
  oneOf:
    '${path} harus menjadi salah satu dari nilai berikut: ${values}',
  notOneOf:
    '${path} tidak boleh menjadi salah satu dari nilai berikut: ${values}',
  // notType: ({ path, type, value, originalValue }) => {
  //   const isCast = originalValue != null && originalValue !== value
  //   let msg
  //     = `${path} harus \`${type}\` tipe, `
  //     + `tetapi nilai akhir adalah: \`${printValue(value, true)}\`${
  //      isCast
  //       ? ` (dilemparkan dari nilai \`${printValue(originalValue, true)}\`).`
  //       : '.'}`

  //   if (value === null) {
  //     msg
  //       += '\n Jika "null" dimaksudkan sebagai nilai kosong, pastikan untuk menandai skema sebagai'
  //       + ' `.nullable()`'
  //   }

  //   return msg
  // },
  notType: '${path} harus diisi',
}

export const string: LocaleObject['string'] = {
  length: '${path} harus persis ${length} karakter',
  min: '${path} harus berisi minimal ${min} karakter',
  max: '${path} harus berisi maksimal ${max} karakter',
  matches: '${path} harus cocok dengan yang berikut: "${regex}"',
  email: '${path} harus berupa email yang valid',
  url: '${path} harus berupa URL yang valid',
  uuid: '${path} harus berupa UUID yang valid',
  trim: '${path} harus berupa string yang dipangkas',
  lowercase: '${path} harus berupa string huruf kecil',
  uppercase: '${path} Harus berupa string huruf besar',
}

export const number: LocaleObject['number'] = {
  min: '${path} harus lebih besar dari atau sama dengan ${min}',
  max: '${path} harus kurang dari atau sama dengan ${max}',
  lessThan: '${path} harus kurang dari ${less}',
  moreThan: '${path} harus lebih besar dari ${more}',
  positive: '${path} harus menjadi angka positif',
  negative: '${path} harus menjadi angka negatif',
  integer: '${path} harus menjadi bilangan bulat',
}

export const date: LocaleObject['date'] = {
  min: '${path} Bidang harus lebih lambat dari ${min}',
  max: '${path} Lapangan harus lebih awal dari ${max}',
}

export const boolean: LocaleObject['boolean'] = {
  isValue: '${path} Bidang harus ${value}',
}

export const object: LocaleObject['object'] = {
  noUnknown:
    '${path} Bidang tidak dapat memiliki kunci yang tidak ditentukan dalam bentuk objek',
}

export const array: LocaleObject['array'] = {
  min: '${path} Bidang harus memiliki setidaknya ${min} item',
  max:
    '${path} Lapangan harus memiliki kurang dari atau sama dengan item ${max}',
  length: '${path} harus memiliki item ${length}',
}
