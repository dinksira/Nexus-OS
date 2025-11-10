'use client';

import { useState, useEffect } from 'react';
import { SystemPerformance } from '@/types/settings';

const initialPerformance: SystemPerformance = {
  cpuUsage: 0,
  memoryUsage: 0,
  storageUsage: 0,
  networkStatus: 'online',
};

export default function SystemSettings() {
  const [performance, setPerformance] = useState<SystemPerformance>(initialPerformance);
  const [storageCleanup, setStorageCleanup] = useState({
    cache: true,
    logs: false,
    tempFiles: true,
  });

  // Simulate performance monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance({
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        storageUsage: Math.floor(Math.random() * 100),
        networkStatus: 'online',
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const PerformanceMeter = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="cyber-card p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-cyan-300 font-medium">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="cyber-text-lg font-bold text-white">Performance</h2>
        <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full ml-4"></div>
      </div>

      <div className="grid gap-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PerformanceMeter
            value={performance.cpuUsage}
            label="CPU Usage"
            color="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
          <PerformanceMeter
            value={performance.memoryUsage}
            label="Memory Usage"
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <PerformanceMeter
            value={performance.storageUsage}
            label="Storage Usage"
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>

        {/* System Diagnostics */}
        <div className="cyber-card p-4">
          <h3 className="text-cyan-300 font-bold mb-4">System Diagnostics</h3>
          <div className="space-y-3">
            {[
              { label: 'Security Scan', status: 'optimal', icon: 'security' },
              { label: 'Network Connectivity', status: 'stable', icon: 'wifi' },
              { label: 'Storage Health', status: 'good', icon: 'storage' },
              { label: 'System Updates', status: 'available', icon: 'update' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-cyan-400">
                    {item.icon}
                  </span>
                  <span className="text-white">{item.label}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === 'optimal' || item.status === 'stable' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Cleanup */}
        <div className="cyber-card p-4">
          <h3 className="text-cyan-300 font-bold mb-4">Storage Optimization</h3>
          <div className="space-y-3">
            {[
              { key: 'cache', label: 'Clear App Cache', size: '2.3 GB' },
              { key: 'logs', label: 'Delete System Logs', size: '1.1 GB' },
              { key: 'tempFiles', label: 'Remove Temp Files', size: '856 MB' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={storageCleanup[item.key as keyof typeof storageCleanup]}
                    onChange={(e) => setStorageCleanup(prev => ({
                      ...prev,
                      [item.key]: e.target.checked
                    }))}
                    className="cyber-checkbox"
                  />
                  <span className="text-white">{item.label}</span>
                </div>
                <span className="text-gray-400 text-sm">{item.size}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 cyber-button bg-red-500/20 border-red-500 hover:bg-red-500/30">
            <span className="material-symbols-outlined text-sm mr-2">delete</span>
            Clean Selected Files
          </button>
        </div>

        {/* System Actions */}
        <div className="cyber-card p-4">
          <h3 className="text-cyan-300 font-bold mb-4">System Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="cyber-button bg-cyan-500/20 border-cyan-500">
              <span className="material-symbols-outlined text-sm mr-2">restart_alt</span>
              Restart System
            </button>
            <button className="cyber-button bg-purple-500/20 border-purple-500">
              <span className="material-symbols-outlined text-sm mr-2">update</span>
              Check Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}