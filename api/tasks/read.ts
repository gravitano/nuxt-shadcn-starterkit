import axios from 'axios'
import type { PaginatedParams } from '../types'
import type { Task } from './types'

export function getTodoList(params: PaginatedParams) {
  return axios.get<Task[]>('/todos', {
    params,
  })
}

export function getTodoById(id: string | number) {
  return axios.get<Task>(`/todos/${id}`)
}
