'use client'

import React from 'react'
import CyberGlassCard from '../ui/CyberGlassCard/CyberGlassCard'

const PerformanceTab = () => {
  const performanceData = [
    { label: 'Page Load Time', current: 1.2, previous: 1.8, unit: 's' },
    { label: 'API Latency', current: 142, previous: 210, unit: 'ms' },
    { label: 'Database Queries', current: 45, previous: 67, unit: 'ms' },
    { label: 'Cache Hit Rate', current: 92, previous: 85, unit: '%' },
  ]

  return (
    <>
      {/* Performance Metrics */}
      <CyberGlassCard className="p-6 lg:col-span-2 xl:col-span-3">
        <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((metric, index) => {
            const improvement = ((metric.previous - metric.current) / metric.previous * 100).toFixed(1)
            return (
              <div key={metric.label} className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                <p className="text-2xl font-bold mb-1">
                  {metric.current}{metric.unit}
                </p>
                <p className="text-xs text-[#00FFC2]">
                  ↑ {improvement}% improvement
                </p>
                <div className="w-full bg-white/10 h-2 rounded-full mt-3">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00BFFF] to-[#00FFC2] rounded-full"
                    style={{ width: `${(metric.current / (metric.previous * 1.5)) * 100}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CyberGlassCard>

      {/* Response Time Chart */}
      <CyberGlassCard className="p-6 lg:col-span-2">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Response Time Trends
        </h3>
        <div className="h-64 flex items-end gap-2">
          {[65, 72, 58, 80, 67, 75, 82, 78, 85, 79, 72, 68].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-[#00BFFF] to-[#00FFC2] rounded-t transition-all duration-500 hover:opacity-80"
                style={{ height: `${value}%` }}
              />
              <span className="text-xs text-gray-400 mt-2">{index + 1}</span>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* Resource Usage */}
      <CyberGlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Resource Allocation
        </h3>
        <div className="space-y-4">
          {[
            { service: 'Web Server', usage: 45, color: '#00BFFF' },
            { service: 'Database', usage: 32, color: '#00FFC2' },
            { service: 'Cache', usage: 18, color: '#FF00E5' },
            { service: 'AI Processing', usage: 65, color: '#FFA500' },
          ].map((service, index) => (
            <div key={service.service}>
              <div className="flex justify-between text-sm mb-1">
                <span>{service.service}</span>
                <span>{service.usage}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${service.usage}%`,
                    backgroundColor: service.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CyberGlassCard>
    </>
  )
}