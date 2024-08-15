import axios from 'axios'
import type { Task } from './types'

export interface CreateTodoPayload {
  title: string
  completed: boolean
}

export function createTodo(payload: CreateTodoPayload) {
  return axios.post<Task>('/todos', payload)
}
