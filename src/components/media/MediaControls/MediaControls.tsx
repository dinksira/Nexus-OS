'use client'

import React from 'react'
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard'

interface MediaControlsProps {
  nowPlaying: any
}

const MediaControls: React.FC<MediaControlsProps> = ({ nowPlaying }) => {
  const queueItems = [
    { id: '1', title: 'Neural Network', artist: 'Quantum Beats', duration: '4:20' },
    { id: '2', title: 'Digital Dreams', artist: 'Cyborg Symphony', duration: '5:15' },
    { id: '3', title: 'Cyber Sync', artist: 'Neon Pulse', duration: '3:45' },
  ]

  const recentPlays = [
    { id: '1', title: 'Chromatic Waves', artist: 'Synth Rider', time: '2 hours ago' },
    { id: '2', title: 'Data Stream', artist: 'Binary Beats', time: '5 hours ago' },
    { id: '3', title: 'Quantum Loop', artist: 'AI Orchestra', time: '1 day ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center">
            <span className="material-symbols-outlined text-[#00BFFF] block mx-auto mb-1">
              add
            </span>
            <span className="text-xs text-gray-300">Add Media</span>
          </button>
          <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center">
            <span className="material-symbols-outlined text-[#00FFC2] block mx-auto mb-1">
              create_new_folder
            </span>
            <span className="text-xs text-gray-300">New Playlist</span>
          </button>
          <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center">
            <span className="material-symbols-outlined text-[#FF00E5] block mx-auto mb-1">
              download
            </span>
            <span className="text-xs text-gray-300">Import</span>
          </button>
          <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center">
            <span className="material-symbols-outlined text-[#FFA500] block mx-auto mb-1">
              settings
            </span>
            <span className="text-xs text-gray-300">Settings</span>
          </button>
        </div>
      </CyberGlassCard>

      {/* Playback Queue */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Playback Queue</h3>
        <div className="space-y-3">
          {queueItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <p className="text-xs text-gray-400 truncate">{item.artist}</p>
              </div>
              <span className="text-xs text-gray-400">{item.duration}</span>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* Recently Played */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Recently Played</h3>
        <div className="space-y-3">
          {recentPlays.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">music_note</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.artist}</p>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </CyberGlassCard>

      {/* System Status */}
      <CyberGlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Media System</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Audio Output</span>
            <span className="text-[#00FFC2]">Quantum Speakers</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Format</span>
            <span className="text-[#00BFFF]">Lossless</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Bitrate</span>
            <span className="text-[#FF00E5]">1411 kbps</span>
          </div>
        </div>
      </CyberGlassCard>
    </div>
  )
}

export default MediaControls