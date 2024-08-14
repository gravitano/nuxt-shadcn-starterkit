import axios from 'axios'
import type { Task } from '~/pages/tasks/schema'

export interface CreateTodoPayload {
  title: string
  completed: boolean
}

export function createTodo(payload: CreateTodoPayload) {
  return axios.post<Task>('/todos', payload)
}
