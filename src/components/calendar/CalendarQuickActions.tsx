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

interface CalendarQuickActionsProps {
  onEventCreate: (event: Omit<CalendarEvent, 'id'>) => void
  currentDate: Date
}

const CalendarQuickActions: React.FC<CalendarQuickActionsProps> = ({
  onEventCreate,
  currentDate
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

  return (
    <CyberGlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={action.label}
            onClick={() => handleQuickAction(action)}
            className={`p-4 rounded-lg bg-gradient-to-br ${action.color} hover:scale-105 transition-transform duration-200 group`}
          >
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-white text-2xl mb-2 group-hover:scale-110 transition-transform">
                {action.icon}
              </span>
              <span className="text-white text-sm font-medium">{action.label}</span>
              <span className="text-white/80 text-xs mt-1">{action.duration}min</span>
            </div>
          </button>
        ))}
      </div>

      {/* Current Date Display */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {currentDate.toLocaleDateString('en-US', { day: 'numeric' })}
          </div>
          <div className="text-gray-400 text-sm">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </CyberGlassCard>
  )
}

export default CalendarQuickActions