'use client'

import React, { useState } from 'react'
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard'

const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const videos = [
    {
      id: '1',
      title: 'Cyberpunk Cityscape',
      creator: 'Visual Arts',
      duration: '2:30',
      views: '12.4K',
      uploadDate: '3 days ago'
    },
    {
      id: '2', 
      title: 'Neural Network Visualization',
      creator: 'AI Gallery',
      duration: '4:15',
      views: '8.7K',
      uploadDate: '1 week ago'
    },
    {
      id: '3',
      title: 'Quantum Computing Demo',
      creator: 'Tech Vision',
      duration: '6:45',
      views: '15.2K',
      uploadDate: '2 days ago'
    },
    {
      id: '4',
      title: 'Digital Art Showcase',
      creator: 'Creative Code',
      duration: '3:20',
      views: '5.9K',
      uploadDate: '5 days ago'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Video Player */}
      <CyberGlassCard className="p-6">
        <div className="aspect-video bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-xl mb-4 flex items-center justify-center relative">
          {/* Play Button Overlay */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-4xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          {/* Video Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg">Cyberpunk Cityscape</h3>
            <p className="text-gray-300">Visual Arts • 12.4K views • 3 days ago</p>
          </div>
        </div>

        {/* Video Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-[#00BFFF] transition-colors">
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
            <button className="text-white hover:text-[#00FFC2] transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="text-white hover:text-[#FF00E5] transition-colors">
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>
          <button className="text-white hover:text-[#FFA500] transition-colors">
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
        </div>
      </CyberGlassCard>

      {/* Video Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Recommended Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <CyberGlassCard key={video.id} className="p-4 cursor-pointer hover:scale-105 transition-transform">
              {/* Video Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-[#00BFFF] to-[#00FFC2] rounded-lg mb-3 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">play_circle</span>
              </div>
              
              {/* Video Info */}
              <div>
                <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">{video.title}</h4>
                <p className="text-gray-400 text-xs mb-1">{video.creator}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{video.views} views</span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            </CyberGlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer