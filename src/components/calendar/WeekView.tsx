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

interface WeekViewProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  onEventSelect: (event: CalendarEvent) => void
  onEventCreate: (event: Omit<CalendarEvent, 'id'>) => void
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  onDateChange,
  onEventSelect,
  onEventCreate
}) => {
  const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 9 PM
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() - currentDate.getDay() + i)
    return date
  })

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    // Sample implementation - replace with real data
    return []
  }

  const formatTime = (hour: number) => {
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`
  }

  return (
    <CyberGlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Week of {days[0].toLocaleDateString()} - {days[6].toLocaleDateString()}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onDateChange(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
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
            This Week
          </button>
          <button 
            onClick={() => onDateChange(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-white">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="pt-8">
          {hours.map(hour => (
            <div key={hour} className="h-16 text-xs text-gray-400 text-right pr-2 border-b border-white/10">
              {formatTime(hour)}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="relative">
            {/* Day header */}
            <div className={`text-center p-2 border-b border-white/10 ${
              day.toDateString() === new Date().toDateString() 
                ? 'bg-[#00BFFF]/20 text-[#00BFFF]' 
                : 'text-white'
            }`}>
              <div className="text-sm font-medium">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-bold">
                {day.getDate()}
              </div>
            </div>

            {/* Time slots */}
            <div className="relative">
              {hours.map(hour => (
                <div
                  key={hour}
                  className="h-16 border-b border-white/5 hover:bg-white/5 cursor-pointer"
                  onClick={() => {
                    const startTime = new Date(day)
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
                  {/* Events would be rendered here */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CyberGlassCard>
  )
}

export default WeekView