import { ObjectId } from 'mongodb'

export interface Task {
  _id?: ObjectId
  userId: ObjectId
  title: string
  description?: string
  completed: boolean
  progress: number // 0-100
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  tags: string[]
  createdAt: Date
  updatedAt: Date
}