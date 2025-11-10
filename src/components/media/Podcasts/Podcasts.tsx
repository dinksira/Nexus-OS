'use client'

import React, { useState } from 'react'
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard'

const Podcasts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Technology', 'Science', 'AI', 'Programming', 'Design']

  const podcasts = [
    {
      id: '1',
      title: 'The AI Chronicles',
      host: 'Tech Talks Network',
      episodes: 45,
      category: 'Technology',
      description: 'Exploring the latest in artificial intelligence and machine learning.'
    },
    {
      id: '2',
      title: 'Quantum Computing Today',
      host: 'Science Hub',
      episodes: 32,
      category: 'Science', 
      description: 'Breaking down complex quantum concepts for everyone.'
    },
    {
      id: '3',
      title: 'Code & Create',
      host: 'Dev Studio',
      episodes: 78,
      category: 'Programming',
      description: 'Programming tips, tricks, and creative coding projects.'
    },
    {
      id: '4',
      title: 'Future Interfaces',
      host: 'Design Collective',
      episodes: 56,
      category: 'Design',
      description: 'The future of user interfaces and experience design.'
    },
    {
      id: '5',
      title: 'Neural Networks',
      host: 'AI Research Lab',
      episodes: 23,
      category: 'AI',
      description: 'Deep dives into neural network architectures and applications.'
    },
  ]

  const episodes = [
    {
      id: '1',
      title: 'The Rise of GPT-4',
      podcast: 'The AI Chronicles',
      duration: '45:30',
      date: '2 days ago',
      played: true
    },
    {
      id: '2',
      title: 'Quantum Supremacy Explained',
      podcast: 'Quantum Computing Today', 
      duration: '38:15',
      date: '1 week ago',
      played: false
    },
    {
      id: '3',
      title: 'React 18 Deep Dive',
      podcast: 'Code & Create',
      duration: '52:40',
      date: '3 days ago',
      played: false
    },
  ]

  const filteredPodcasts = selectedCategory === 'all' 
    ? podcasts 
    : podcasts.filter(podcast => podcast.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <CyberGlassCard className="p-6">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </CyberGlassCard>

      {/* Featured Podcasts */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Featured Podcasts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map((podcast) => (
            <CyberGlassCard key={podcast.id} className="p-6 cursor-pointer hover:scale-105 transition-transform">
              {/* Podcast Cover */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-xl mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">podcasts</span>
              </div>
              
              {/* Podcast Info */}
              <div>
                <h4 className="font-semibold text-white text-lg mb-1">{podcast.title}</h4>
                <p className="text-gray-400 text-sm mb-2">{podcast.host}</p>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{podcast.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{podcast.episodes} episodes</span>
                  <span className="text-xs px-2 py-1 bg-[#00FFC2]/20 text-[#00FFC2] rounded">
                    {podcast.category}
                  </span>
                </div>
              </div>
            </CyberGlassCard>
          ))}
        </div>
      </div>

      {/* Latest Episodes */}
      <CyberGlassCard className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Latest Episodes</h3>
        <div className="space-y-4">
          {episodes.map((episode) => (
            <div key={episode.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00BFFF] to-[#00FFC2] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">play_arrow</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{episode.title}</h4>
                <p className="text-gray-400 text-sm">{episode.podcast}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">{episode.duration}</p>
                <p className="text-gray-500 text-xs">{episode.date}</p>
              </div>
              {episode.played && (
                <div className="w-2 h-2 bg-[#00FFC2] rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </CyberGlassCard>
    </div>
  )
}

export default Podcasts