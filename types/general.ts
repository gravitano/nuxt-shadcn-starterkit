import type { MutationObserverResult, UseQueryOptions } from '@tanstack/vue-query'

export interface PaginatedParams {
  _page: number
  _limit: number
}

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>

export interface FieldError {
  tag: string
  field: string
  message: string
}

export interface ResponseValidationError {
  code: number
  message: string
  errors: FieldError[]
}

export type DistributiveOmit<T, TKeyOfAny extends keyof any> = T extends any ? Omit<T, TKeyOfAny> : never
export type MutationResult<TData, TError, TVariables, TContext> = DistributiveOmit<MutationObserverResult<TData, TError, TVariables, TContext>, 'mutate' | 'reset'>
