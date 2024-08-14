import axios from 'axios'
import type { Task } from '~/pages/tasks/schema'

export function deleteTodo(id: string | number) {
  return axios.delete<Task>(`/todos/${id}`)
}
