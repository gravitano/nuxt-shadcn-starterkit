import axios from 'axios'
import type { Task } from './types'

export function deleteTodo(id: string | number) {
  return axios.delete<Task>(`/todos/${id}`)
}
