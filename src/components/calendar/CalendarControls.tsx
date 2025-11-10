'use client'

import React from 'react'
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

interface CalendarControlsProps {
  currentDate: Date
  selectedEvent: CalendarEvent | null
  onDateChange: (date: Date) => void
  onEventCreate: (event: Omit<CalendarEvent, 'id'>) => void
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  currentDate,
  selectedEvent,
  onDateChange,
  onEventCreate
}) => {
  const quickActions = [
    {
      icon: 'video_call',
      label: 'Quick Meeting',
      type: 'meeting' as const,
      duration: 30,
      color: 'from-[#00BFFF] to-blue-600'
    },
    {
      icon: 'notifications',
      label: 'Set Reminder',
      type: 'reminder' as const,
      duration: 5,
      color: 'from-[#FF00E5] to-pink-600'
    },
    {
      icon: 'checklist',
      label: 'Add Task',
      type: 'task' as const,
      duration: 60,
      color: 'from-[#00FFC2] to-green-600'
    },
    {
      icon: 'celebration',
      label: 'New Event',
      type: 'event' as const,
      duration: 120,
      color: 'from-[#FFA500] to-orange-600'
    }
  ]

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const startTime = new Date(currentDate)
    const endTime = new Date(startTime.getTime() + action.duration * 60000)

    onEventCreate({
      title: action.label,
      description: `Quick ${action.type} created`,
      startTime,
      endTime,
      type: action.type,
      priority: 'medium'
    })
  }

  const stats = [
    { label: 'Events Today', value: '3', color: 'text-[#00BFFF]' },
    { label: 'Upcoming', value: '12', color: 'text-[#00FFC2]' },
    { label: 'Completed', value: '8', color: 'text-[#FF00E5]' },
    { label: 'High Priority', value: '2', color: 'text-[#FFA500]' }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action)}
              className={`p-3 rounded-lg bg-gradient-to-br ${action.color} hover:scale-105 transition-transform duration-200 group`}
            >
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-white text-xl mb-1 group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <span className="text-white text-xs font-medium">{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      </CyberGlassCard>

      {/* Calendar Stats */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Calendar Stats</h3>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex justify-between items-center p-2 hover:bg-white/5 rounded">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* Selected Event Details */}
      {selectedEvent && (
        <CyberGlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Event Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm">Title</label>
              <p className="text-white font-medium">{selectedEvent.title}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Description</label>
              <p className="text-white text-sm">{selectedEvent.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">Start</label>
                <p className="text-white text-sm">{selectedEvent.startTime.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">End</label>
                <p className="text-white text-sm">{selectedEvent.endTime.toLocaleString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">Type</label>
                <p className="text-white text-sm capitalize">{selectedEvent.type}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Priority</label>
                <p className="text-white text-sm capitalize">{selectedEvent.priority}</p>
              </div>
            </div>
          </div>
        </CyberGlassCard>
      )}

      {/* Upcoming Events */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Upcoming</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Team Meeting</p>
                <p className="text-xs text-gray-400 truncate">In 30 minutes</p>
              </div>
              <span className="material-symbols-outlined text-[#00BFFF] text-sm">
                schedule
              </span>
            </div>
          ))}
        </div>
      </CyberGlassCard>
    </div>
  )
}

export default CalendarControls