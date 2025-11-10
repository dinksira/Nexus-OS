'use client'

import React, { useState } from 'react'
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

interface EventManagerProps {
  selectedEvent: CalendarEvent | null
  onEventSelect: (event: CalendarEvent | null) => void
  onEventUpdate: (event: CalendarEvent) => void
  onEventDelete: (eventId: string) => void
}

const EventManager: React.FC<EventManagerProps> = ({
  selectedEvent,
  onEventSelect,
  onEventUpdate,
  onEventDelete
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sample events data
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Sync',
      description: 'Weekly team synchronization meeting',
      startTime: new Date(),
      endTime: new Date(Date.now() + 60 * 60 * 1000),
      type: 'meeting',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Project Deadline',
      description: 'Final submission for quantum project',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
      type: 'task',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Client Call',
      description: 'Monthly client review meeting',
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: 'meeting',
      priority: 'medium'
    }
  ]

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return 'text-[#00BFFF]'
      case 'reminder': return 'text-[#FF00E5]'
      case 'task': return 'text-[#00FFC2]'
      case 'event': return 'text-[#FFA500]'
      default: return 'text-gray-400'
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

  const filteredEvents = sampleEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <CyberGlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Event Matrix</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#00FFC2] text-white rounded-lg hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined mr-2">add</span>
          New Event
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent"
        />
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedEvent?.id === event.id
                ? 'border-[#00BFFF] bg-[#00BFFF]/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
            onClick={() => onEventSelect(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-2 rounded-lg bg-white/10 ${getEventColor(event.type)}`}>
                  <span className="material-symbols-outlined">
                    {getEventIcon(event.type)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{event.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      event.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {event.priority}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        schedule
                      </span>
                      {event.startTime.toLocaleString()}
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
                <span className="material-symbols-outlined text-[#00FFC2]">
                  check_circle
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
              event_busy
            </span>
            <p className="text-gray-400">No events found</p>
          </div>
        )}
      </div>
    </CyberGlassCard>
  )
}

export default EventManager