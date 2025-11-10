'use client'

import React from 'react'
import { motion } from 'framer-motion'
import CyberGlassCard from '../ui/CyberGlassCard/CyberGlassCard'

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

interface DayViewProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  onEventSelect: (event: CalendarEvent) => void
  onEventCreate: (event: Omit<CalendarEvent, 'id'>) => void
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  onDateChange,
  onEventSelect,
  onEventCreate
}) => {
  const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 9 PM

  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Morning Standup',
      description: 'Daily team standup meeting',
      startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0),
      endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 30),
      type: 'meeting',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Project Work',
      description: 'Focused work on quantum project',
      startTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0),
      endTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0),
      type: 'task',
      priority: 'medium'
    }
  ]

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'bg-[#00BFFF]'
      case 'reminder': return 'bg-[#FF00E5]'
      case 'task': return 'bg-[#00FFC2]'
      case 'event': return 'bg-[#FFA500]'
      default: return 'bg-gray-500'
    }
  }

  const getEventsForHour = (hour: number) => {
    return sampleEvents.filter(event => {
      const eventHour = new Date(event.startTime).getHours()
      return eventHour === hour
    })
  }

  return (
    <CyberGlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onDateChange(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
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
            onClick={() => onDateChange(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {hours.map(hour => {
          const hourEvents = getEventsForHour(hour)
          const isCurrentHour = new Date().getHours() === hour && 
                               currentDate.toDateString() === new Date().toDateString()

          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: hour * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                isCurrentHour 
                  ? 'border-[#00BFFF] bg-[#00BFFF]/10' 
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="w-16 text-right">
                <div className="text-white font-medium">
                  {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                {hourEvents.map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg ${getEventColor(event.type)} text-white cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => onEventSelect(event)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <span className="text-sm opacity-90">
                        {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 mt-1">{event.description}</p>
                  </div>
                ))}
                
                {hourEvents.length === 0 && (
                  <div 
                    className="p-3 border border-dashed border-white/20 rounded-lg text-gray-400 hover:text-white hover:border-white/40 cursor-pointer transition-colors"
                    onClick={() => {
                      const startTime = new Date(currentDate)
                      startTime.setHours(hour, 0, 0, 0)
                      onEventCreate({
                        title: 'New Event',
                        description: '',
                        startTime,
                        endTime: new Date(startTime.getTime() + 60 * 60 * 1000),
                        type: 'meeting',
                        priority: 'medium'
                      })
                    }}
                  >
                    + Add event
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </CyberGlassCard>
  )
}

export default DayView