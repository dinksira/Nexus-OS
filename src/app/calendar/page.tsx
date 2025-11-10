'use client'

import React, { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout/MainLayout'
import CalendarGrid from '../../components/calendar/CalendarGrid'
import WeekView from '../../components/calendar/WeekView'
import DayView from '../../components/calendar/DayView'
import EventManager from '../../components/calendar/EventManager'
import CalendarControls from '../../components/calendar/CalendarControls'

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

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState('month')
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  const calendarTabs = [
    { id: 'month', label: 'Quantum Month', icon: 'calendar_month' },
    { id: 'week', label: 'Time Stream', icon: 'view_week' },
    { id: 'day', label: 'Daily View', icon: 'today' },
    { id: 'events', label: 'Event Matrix', icon: 'event' },
    { id: 'schedule', label: 'Auto Schedule', icon: 'schedule' },
  ]

  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  const handleEventCreate = (newEvent: Omit<CalendarEvent, 'id'>) => {
    // Implementation for event creation
    console.log('Creating event:', newEvent)
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    // Implementation for event update
    console.log('Updating event:', updatedEvent)
    setSelectedEvent(updatedEvent)
  }

  const handleEventDelete = (eventId: string) => {
    // Implementation for event deletion
    console.log('Deleting event:', eventId)
    setSelectedEvent(null)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Quantum Calendar
            </h1>
            <p className="text-gray-400">Temporal coordination interface</p>
          </div>
          
          {/* Current Date Display */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00BFFF] to-[#00FFC2] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">
                  calendar_today
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm">Current View</p>
                <p className="text-gray-400 text-xs">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-1 bg-white/5 rounded-xl backdrop-blur-lg">
          {calendarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00BFFF] to-[#00FFC2] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="xl:col-span-3">
            {activeTab === 'month' && (
              <CalendarGrid
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                onEventSelect={handleEventSelect}
                onEventCreate={handleEventCreate}
              />
            )}
            {activeTab === 'week' && (
              <WeekView
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                onEventSelect={handleEventSelect}
                onEventCreate={handleEventCreate}
              />
            )}
            {activeTab === 'day' && (
              <DayView
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                onEventSelect={handleEventSelect}
                onEventCreate={handleEventCreate}
              />
            )}
            {activeTab === 'events' && (
              <EventManager
                selectedEvent={selectedEvent}
                onEventSelect={setSelectedEvent}
                onEventUpdate={handleEventUpdate}
                onEventDelete={handleEventDelete}
              />
            )}
            {activeTab === 'schedule' && <div>Auto Schedule Component</div>}
          </div>

          {/* Sidebar - Calendar Controls */}
          <div className="xl:col-span-1">
            <CalendarControls
              currentDate={currentDate}
              selectedEvent={selectedEvent}
              onDateChange={setCurrentDate}
              onEventCreate={handleEventCreate}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CalendarPage