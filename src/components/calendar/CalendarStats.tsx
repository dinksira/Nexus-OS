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

interface CalendarStatsProps {
  events: CalendarEvent[]
  currentDate: Date
}

const CalendarStats: React.FC<CalendarStatsProps> = ({ events, currentDate }) => {
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.startTime)
    return eventDate.getMonth() === currentDate.getMonth() &&
           eventDate.getFullYear() === currentDate.getFullYear()
  })

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.startTime)
    const today = new Date()
    return eventDate.getDate() === today.getDate() &&
           eventDate.getMonth() === today.getMonth() &&
           eventDate.getFullYear() === today.getFullYear()
  })

  const completedEvents = events.filter(event => event.completed)
  const highPriorityEvents = events.filter(event => event.priority === 'high')

  const stats = [
    {
      label: 'This Month',
      value: currentMonthEvents.length.toString(),
      icon: 'calendar_month',
      color: 'text-[#00BFFF]'
    },
    {
      label: 'Today',
      value: todayEvents.length.toString(),
      icon: 'today',
      color: 'text-[#00FFC2]'
    },
    {
      label: 'Completed',
      value: completedEvents.length.toString(),
      icon: 'check_circle',
      color: 'text-[#00FFC2]'
    },
    {
      label: 'High Priority',
      value: highPriorityEvents.length.toString(),
      icon: 'priority_high',
      color: 'text-[#FF00E5]'
    }
  ]

  const eventTypeDistribution = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <CyberGlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Calendar Stats</h3>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
            <span className={`material-symbols-outlined text-2xl mb-2 ${stat.color}`}>
              {stat.icon}
            </span>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Event Type Distribution */}
      <div className="space-y-3">
        <h4 className="text-white font-medium mb-3">Event Distribution</h4>
        {Object.entries(eventTypeDistribution).map(([type, count]) => {
          const percentage = (count / events.length) * 100
          const getTypeColor = (type: string) => {
            switch (type) {
              case 'meeting': return 'bg-[#00BFFF]'
              case 'reminder': return 'bg-[#FF00E5]'
              case 'task': return 'bg-[#00FFC2]'
              case 'event': return 'bg-[#FFA500]'
              default: return 'bg-gray-500'
            }
          }

          return (
            <div key={type} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 capitalize">{type}</span>
                <span className="text-gray-400">{count} events</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getTypeColor(type)} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Productivity Tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#00BFFF]/20 to-[#FF00E5]/20 rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00FFC2]">
            tips_and_updates
          </span>
          <div>
            <p className="text-white text-sm font-medium">Productivity Tip</p>
            <p className="text-gray-400 text-xs">
              Schedule focused work blocks in 90-minute intervals for optimal productivity.
            </p>
          </div>
        </div>
      </div>
    </CyberGlassCard>
  )
}

export default CalendarStats