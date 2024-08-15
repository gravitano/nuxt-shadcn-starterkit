import axios from 'axios'
import type { Task } from './types'

export interface UpdateTodoPayload {
  title: string
  completed: boolean
}

export function updateTodo(id: string | number, payload: UpdateTodoPayload) {
  return axios.put<Task>(`/todos/${id}`, payload)
}
