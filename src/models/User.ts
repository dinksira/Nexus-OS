import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  email: string
  username: string
  password: string // Hashed
  displayName?: string
  avatar?: string
  preferences?: {
    theme: 'dark' | 'light' | 'auto'
    sidebarCollapsed: boolean
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  _id?: ObjectId
  userId: ObjectId
  token: string
  expiresAt: Date
  createdAt: Date
}