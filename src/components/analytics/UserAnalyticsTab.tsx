'use client'

import React from 'react'
import CyberGlassCard from '../ui/CyberGlassCard/CyberGlassCard'

const UserAnalyticsTab = () => {
  const userStats = [
    { period: '24h', users: 1242, growth: 12 },
    { period: '7d', users: 8456, growth: 8 },
    { period: '30d', users: 32457, growth: 15 },
  ]

  const userLocations = [
    { country: 'United States', users: 12457, percentage: 38 },
    { country: 'Germany', users: 8456, percentage: 26 },
    { country: 'Japan', users: 5678, percentage: 17 },
    { country: 'Other', users: 5866, percentage: 18 },
  ]

  return (
    <>
      {/* User Growth */}
      <CyberGlassCard className="p-6 lg:col-span-2">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          User Growth
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {userStats.map((stat, index) => (
            <div key={stat.period} className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold text-[#00BFFF]">{stat.users.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mt-1">Users ({stat.period})</p>
              <p className="text-xs text-[#00FFC2] mt-1">+{stat.growth}% growth</p>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* User Locations */}
      <CyberGlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          User Distribution
        </h3>
        <div className="space-y-4">
          {userLocations.map((location, index) => (
            <div key={location.country}>
              <div className="flex justify-between text-sm mb-1">
                <span>{location.country}</span>
                <span>{location.percentage}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] rounded-full transition-all duration-1000"
                  style={{ width: `${location.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* Active Sessions */}
      <CyberGlassCard className="p-6 lg:col-span-2">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Active Sessions
        </h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#00FFC2]">1,247</p>
            <p className="text-gray-400 mt-2">Currently Active Users</p>
          </div>
        </div>
      </CyberGlassCard>

      {/* User Engagement */}
      <CyberGlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Engagement Metrics
        </h3>
        <div className="space-y-4">
          {[
            { metric: 'Avg. Session', value: '12m 34s', trend: '+2.1%' },
            { metric: 'Pages/Session', value: '8.2', trend: '+0.3' },
            { metric: 'Bounce Rate', value: '24%', trend: '-3.2%' },
          ].map((item, index) => (
            <div key={item.metric} className="flex justify-between items-center p-3 bg-white/5 rounded">
              <span className="text-sm">{item.metric}</span>
              <div className="text-right">
                <p className="font-bold">{item.value}</p>
                <p className={`text-xs ${
                  item.trend.startsWith('+') ? 'text-[#00FFC2]' : 'text-[#FF00E5]'
                }`}>
                  {item.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CyberGlassCard>
    </>
  )
}