'use client'

import React from 'react'
import { motion } from 'framer-motion'
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard'

interface CalendarEvent {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  type: 'meeting' | 'reminder' | 'task' | 'event'
  priority: 'low' | 'medium' | 'high'
  completed?: boolean
}

interface CalendarGridProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  onEventSelect: (event: CalendarEvent) => void
  onEventCreate: (event: Omit<CalendarEvent, 'id'>) => void
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  onDateChange,
  onEventSelect,
  onEventCreate
}) => {
  // Sample events data
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Sync',
      description: 'Weekly team synchronization meeting',
      startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 10, 0),
      endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 11, 0),
      type: 'meeting',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Project Deadline',
      description: 'Final submission for quantum project',
      startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20, 17, 0),
      endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20, 18, 0),
      type: 'task',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Client Call',
      description: 'Monthly client review meeting',
      startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 14, 0),
      endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 15, 0),
      type: 'meeting',
      priority: 'medium'
    }
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDay = (day: number) => {
    return sampleEvents.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'bg-gradient-to-r from-[#00BFFF] to-blue-600'
      case 'reminder': return 'bg-gradient-to-r from-[#FF00E5] to-pink-600'
      case 'task': return 'bg-gradient-to-r from-[#00FFC2] to-green-600'
      case 'event': return 'bg-gradient-to-r from-[#FFA500] to-orange-600'
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
  }

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'groups'
      case 'reminder': return 'notifications'
      case 'task': return 'checklist'
      case 'event': return 'celebration'
      default: return 'event'
    }
  }

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []

  // Previous month's days
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <CyberGlassCard className="p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              chevron_left
            </span>
          </button>
          <button 
            onClick={() => onDateChange(new Date())}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            Today
          </button>
          <button 
            onClick={() => onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekdays.map(day => (
          <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : []
          const isToday = day === new Date().getDate() && 
                         currentDate.getMonth() === new Date().getMonth() &&
                         currentDate.getFullYear() === new Date().getFullYear()

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`min-h-[120px] p-2 rounded-lg border border-white/10 ${
                day ? 'bg-white/5 hover:bg-white/10 cursor-pointer' : 'bg-transparent'
              } ${isToday ? 'ring-2 ring-[#00BFFF] ring-opacity-50' : ''}`}
              onClick={() => day && console.log('Day clicked:', day)}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-2 ${
                    isToday ? 'text-[#00BFFF]' : 'text-white'
                  }`}>
                    {day}
                  </div>
                  
                  {/* Events for this day */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.02 }}
                        className={`text-xs p-1 rounded ${getEventColor(event.type)} text-white cursor-pointer`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onEventSelect(event)
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            {getEventIcon(event.type)}
                          </span>
                          <span className="truncate flex-1">{event.title}</span>
                        </div>
                      </motion.div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-400 text-center">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    </CyberGlassCard>
  )
}

export default CalendarGrid