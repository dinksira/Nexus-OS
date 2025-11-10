'use client'

import React, { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout/MainLayout'
import MediaLibrary from '../../components/media/MediaLibrary/MediaLibrary'
import MusicPlayer from '../../components/media/MusicPlayer/MusicPlayer'
import VideoPlayer from '../../components/media/VideoPlayer/VideoPlayer'
import Podcasts from '../../components/media/Podcasts/Podcasts'
import MediaControls from '../../components/media/MediaControls/MediaControls'

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState('library')
  const [nowPlaying, setNowPlaying] = useState(null)

  const mediaTabs = [
    { id: 'library', label: 'Quantum Library', icon: 'library_music' },
    { id: 'music', label: 'Audio Stream', icon: 'music_note' },
    { id: 'video', label: 'Visual Feed', icon: 'movie' },
    { id: 'podcasts', label: 'Neural Casts', icon: 'podcasts' },
    { id: 'playlists', label: 'Data Streams', icon: 'playlist_play' },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Media Center
            </h1>
            <p className="text-gray-400">Quantum entertainment interface</p>
          </div>
          
          {/* Now Playing Mini Player */}
          {nowPlaying && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-lg"></div>
                <div>
                  <p className="font-semibold text-sm">Now Playing</p>
                  <p className="text-gray-400 text-xs">Chromatic Waves - Synth Rider</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-1 bg-white/5 rounded-xl backdrop-blur-lg">
          {mediaTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
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
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="xl:col-span-3">
            {activeTab === 'library' && <MediaLibrary onMediaSelect={setNowPlaying} />}
            {activeTab === 'music' && <MusicPlayer />}
            {activeTab === 'video' && <VideoPlayer />}
            {activeTab === 'podcasts' && <Podcasts />}
            {activeTab === 'playlists' && <div>Playlists Component</div>}
          </div>

          {/* Sidebar - Media Controls */}
          <div className="xl:col-span-1">
            <MediaControls nowPlaying={nowPlaying} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default MediaPage