import { useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import type { PaginatedParams, QueryOptions } from '~/types/general'
import type { Todo, TodoPayload } from '~/types/todos'

export interface UseTodosOptions {
  queryKey?: unknown[]
  queryOptions?: QueryOptions<Todo[]>
  params?: MaybeRefOrGetter<PaginatedParams>
}

const PATH = '/api/todos'

export function useTodos(options?: UseTodosOptions) {
  const { queryKey = [], queryOptions = {}, params = {} } = options || {}
  return useQuery({
    queryKey: ['todos', ...queryKey],
    queryFn: async () => {
      const res = await axios.get<Todo[]>(PATH, {
        params: toValue(params),
      })
      return res.data
    },
    ...queryOptions,
  })
}

export function useTodo(id: number | string) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      const res = await axios.get<Todo>(`${PATH}/${id}`)
      return res.data
    },
  })
}

export function useDeleteTodo() {
  return useMutation({
    mutationFn: (id: number | string) => {
      return axios.delete<Todo>(`${PATH}/${id}`)
    },
  })
}

export function useCreateOrUpdateTodo() {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id?: number | string
      body: TodoPayload
    }) => {
      if (id) {
        return axios.put<Todo>(`${PATH}/${id}`, body)
      }
      else {
        return axios.post<Todo>(PATH, body)
      }
    },
  })
}
