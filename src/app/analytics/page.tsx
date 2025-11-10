'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CyberGlassCard from '../../components/ui/CyberGlassCard/CyberGlassCard'
import MainLayout from '../../components/layout/MainLayout/MainLayout'

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Quantum Overview', icon: 'dashboard' },
    { id: 'performance', label: 'System Performance', icon: 'speed' },
    { id: 'user', label: 'User Analytics', icon: 'person' },
    { id: 'financial', label: 'Financial Metrics', icon: 'trending_up' },
    { id: 'security', label: 'Security Monitor', icon: 'security' },
  ]

  return (
    <MainLayout>
      {/* Analytics Content */}
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Quantum Analytics
          </h1>
          <p className="text-gray-400">Real-time system intelligence and performance metrics</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 p-1 bg-white/5 rounded-xl backdrop-blur-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Tab components will go here */}
          <div className="lg:col-span-2 xl:col-span-3">
            <CyberGlassCard className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h3>
              <p className="text-gray-400">
                {activeTab === 'overview' && 'System overview and real-time metrics will be displayed here'}
                {activeTab === 'performance' && 'Performance analytics and system monitoring will be displayed here'}
                {activeTab === 'user' && 'User analytics and engagement metrics will be displayed here'}
                {activeTab === 'financial' && 'Financial metrics and revenue analytics will be displayed here'}
                {activeTab === 'security' && 'Security monitoring and threat detection will be displayed here'}
              </p>
            </CyberGlassCard>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AnalyticsPage