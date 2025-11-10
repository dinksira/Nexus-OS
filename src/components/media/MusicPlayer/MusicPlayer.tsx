'use client'

import React, { useState, useRef, useEffect } from 'react'
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard'

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(235) // 3:55 in seconds
  const [volume, setVolume] = useState(80)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = {
    title: 'Chromatic Waves',
    artist: 'Synth Rider',
    album: 'Digital Dreams',
    coverArt: '',
    duration: duration
  }

  const playlists = [
    { name: 'Cyber Synth', tracks: 24, color: '#FF00E5' },
    { name: 'Quantum Beats', tracks: 18, color: '#00BFFF' },
    { name: 'Neural Ambient', tracks: 32, color: '#00FFC2' },
    { name: 'Digital Dreams', tracks: 15, color: '#FFA500' },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Simulate audio playback
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            clearInterval(interval)
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    setCurrentTime(percent * duration)
  }

  return (
    <div className="space-y-6">
      {/* Now Playing Card */}
      <CyberGlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Album Art */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-xl shadow-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-6xl">
                music_note
              </span>
            </div>
          </div>

          {/* Track Info and Controls */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">{currentTrack.title}</h2>
              <p className="text-gray-400 text-lg">{currentTrack.artist}</p>
              <p className="text-gray-500 text-sm">{currentTrack.album}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div 
                className="w-full h-2 bg-white/10 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="text-white/70 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">shuffle</span>
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">skip_previous</span>
                </button>
                <button 
                  onClick={handlePlayPause}
                  className="w-16 h-16 bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl text-white">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">skip_next</span>
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">repeat</span>
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400">volume_up</span>
                <div className="w-24 h-1 bg-white/10 rounded-full">
                  <div 
                    className="h-full bg-[#00FFC2] rounded-full"
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CyberGlassCard>

      {/* Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {playlists.map((playlist, index) => (
          <CyberGlassCard key={playlist.name} className="p-4 cursor-pointer hover:scale-105 transition-transform">
            <div 
              className="w-full h-32 rounded-lg mb-3 flex items-center justify-center"
              style={{ backgroundColor: `${playlist.color}20` }}
            >
              <span 
                className="material-symbols-outlined text-4xl"
                style={{ color: playlist.color }}
              >
                playlist_play
              </span>
            </div>
            <h3 className="font-semibold text-white">{playlist.name}</h3>
            <p className="text-gray-400 text-sm">{playlist.tracks} tracks</p>
          </CyberGlassCard>
        ))}
      </div>
    </div>
  )
}

export default MusicPlayer