import { ObjectId } from 'mongodb'

export interface WidgetLayout {
  _id?: ObjectId
  userId: ObjectId
  widgetType: 'tasks' | 'crypto' | 'health' | 'media' | 'notes'
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  settings: Record<string, any>
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}