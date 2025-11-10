'use client'

import React, { useState } from 'react'
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

interface CalendarEventsProps {
  events: CalendarEvent[]
  selectedEvent: CalendarEvent | null
  onEventSelect: (event: CalendarEvent) => void
  onEventUpdate: (event: CalendarEvent) => void
  onEventDelete: (eventId: string) => void
}

const CalendarEvents: React.FC<CalendarEventsProps> = ({
  events,
  selectedEvent,
  onEventSelect,
  onEventUpdate,
  onEventDelete
}) => {
  const [isCreating, setIsCreating] = useState(false)

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'groups'
      case 'reminder': return 'notifications'
      case 'task': return 'checklist'
      case 'event': return 'celebration'
      default: return 'event'
    }
  }

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'text-[#00BFFF]'
      case 'reminder': return 'text-[#FF00E5]'
      case 'task': return 'text-[#00FFC2]'
      case 'event': return 'text-[#FFA500]'
      default: return 'text-gray-400'
    }
  }

  const getPriorityColor = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const upcomingEvents = events
    .filter(event => new Date(event.startTime) >= new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5)

  return (
    <CyberGlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
        <button 
          onClick={() => setIsCreating(true)}
          className="p-2 bg-[#00BFFF] hover:bg-blue-400 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-white text-lg">
            add
          </span>
        </button>
      </div>

      <div className="space-y-3">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
              event_available
            </span>
            <p className="text-gray-400">No upcoming events</p>
          </div>
        ) : (
          upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border border-white/10 hover:border-white/20 cursor-pointer transition-all ${
                selectedEvent?.id === event.id ? 'bg-white/10 ring-2 ring-[#00BFFF] ring-opacity-50' : 'bg-white/5'
              }`}
              onClick={() => onEventSelect(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg bg-white/10 ${getEventColor(event.type)}`}>
                    <span className="material-symbols-outlined text-lg">
                      {getEventIcon(event.type)}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium truncate">{event.title}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">
                          schedule
                        </span>
                        {formatTime(new Date(event.startTime))} - {formatTime(new Date(event.endTime))}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <span className="material-symbols-outlined text-xs">
                          category
                        </span>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>

                {event.completed && (
                  <span className="material-symbols-outlined text-[#00FFC2] text-lg">
                    check_circle
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <CyberGlassCard className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
                <button 
                  onClick={() => onEventSelect(null)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <span className="material-symbols-outlined text-white">
                    close
                  </span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Description</label>
                  <p className="text-white">{selectedEvent.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Start Time</label>
                    <p className="text-white">{new Date(selectedEvent.startTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">End Time</label>
                    <p className="text-white">{new Date(selectedEvent.endTime).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Type</label>
                    <p className="text-white capitalize">{selectedEvent.type}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Priority</label>
                    <p className="text-white capitalize">{selectedEvent.priority}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button 
                    onClick={() => onEventUpdate({ ...selectedEvent, completed: !selectedEvent.completed })}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      selectedEvent.completed 
                        ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                        : 'bg-[#00FFC2] hover:bg-green-400 text-black'
                    }`}
                  >
                    {selectedEvent.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button 
                    onClick={() => onEventDelete(selectedEvent.id)}
                    className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-400 rounded-lg text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </CyberGlassCard>
          </motion.div>
        </div>
      )}
    </CyberGlassCard>
  )
}

export default CalendarEvents