export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TodoPayload = Omit<Todo, 'id' | 'userId'>
