'use client'

import React, { useState } from 'react'
import CalendarGrid from '../../components/calendar/CalendarGrid'
import CalendarEvents from '../../components/calendar/CalendarEvents'
import CalendarQuickActions from '../../components/calendar/CalendarQuickActions'
import CalendarStats from '../../components/calendar/CalendarStats'

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

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  const handleEventCreate = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Date.now().toString()
    }
    setEvents(prev => [...prev, event])
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    setSelectedEvent(updatedEvent)
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
    setSelectedEvent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,229,0.1),_transparent_50%)]"></div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Quantum Calendar
            </h1>
            <p className="text-gray-400">Schedule your digital existence</p>
          </div>
          
          {/* View Controls */}
          <div className="flex gap-2">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  view === viewType
                    ? 'bg-[#00BFFF] text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Calendar Area */}
          <div className="xl:col-span-2 space-y-6">
            <CalendarGrid
              currentDate={currentDate}
              view={view}
              events={events}
              onDateChange={setCurrentDate}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CalendarQuickActions
              onEventCreate={handleEventCreate}
              currentDate={currentDate}
            />
            
            <CalendarEvents
              events={events}
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
              onEventUpdate={handleEventUpdate}
              onEventDelete={handleEventDelete}
            />
            
            <CalendarStats events={events} currentDate={currentDate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage