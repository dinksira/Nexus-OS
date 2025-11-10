'use client'

import React from 'react'
import { motion } from 'framer-motion'
import CyberGlassCard from '../ui/CyberGlassCard/CyberGlassCard'

const OverviewTab = () => {
  const metrics = [
    { label: 'System Uptime', value: '99.98%', trend: '+0.2%', icon: 'schedule' },
    { label: 'Active Users', value: '2.4K', trend: '+12%', icon: 'group' },
    { label: 'API Response', value: '142ms', trend: '-8ms', icon: 'bolt' },
    { label: 'Data Processed', value: '4.2TB', trend: '+1.2TB', icon: 'storage' },
  ]

  return (
    <>
      {/* Key Metrics */}
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CyberGlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <p className={`text-xs mt-1 ${
                  metric.trend.startsWith('+') ? 'text-[#00FFC2]' : 'text-[#FF00E5]'
                }`}>
                  {metric.trend} from last week
                </p>
              </div>
              <div className="text-3xl text-[#00BFFF]">
                <span className="material-symbols-outlined">{metric.icon}</span>
              </div>
            </div>
          </CyberGlassCard>
        </motion.div>
      ))}

      {/* System Health */}
      <CyberGlassCard className="p-6 lg:col-span-2 xl:col-span-3">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          System Health Monitor
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'CPU Usage', value: 65, color: '#00BFFF' },
            { label: 'Memory', value: 42, color: '#00FFC2' },
            { label: 'Storage', value: 78, color: '#FF00E5' },
            { label: 'Network', value: 34, color: '#FFA500' },
          ].map((item, index) => (
            <div key={item.label} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="3"
                    strokeDasharray={`${item.value}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* Real-time Activity */}
      <CyberGlassCard className="p-6 lg:col-span-2">
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Real-time Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: 'User Login', user: 'quantum_operator', time: '2s ago', status: 'success' },
            { action: 'Data Export', user: 'ai_core', time: '5s ago', status: 'processing' },
            { action: 'System Backup', user: 'nexus_bot', time: '12s ago', status: 'success' },
            { action: 'API Request', user: 'external_app', time: '18s ago', status: 'warning' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-[#00FFC2]' :
                  activity.status === 'processing' ? 'bg-[#00BFFF]' : 'bg-[#FFA500]'
                }`} />
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">by {activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </CyberGlassCard>
    </>
  )
}