'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard'

interface MediaItem {
  id: string
  title: string
  artist: string
  type: 'music' | 'video' | 'podcast'
  duration: string
  coverArt: string
  genre: string
}

interface MediaLibraryProps {
  onMediaSelect: (media: MediaItem) => void
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ onMediaSelect }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      title: 'Chromatic Waves',
      artist: 'Synth Rider',
      type: 'music',
      duration: '3:45',
      coverArt: '',
      genre: 'Electronic'
    },
    {
      id: '2',
      title: 'Neural Network',
      artist: 'Quantum Beats',
      type: 'music',
      duration: '4:20',
      coverArt: '',
      genre: 'Ambient'
    },
    {
      id: '3',
      title: 'Digital Dreams',
      artist: 'Cyborg Symphony',
      type: 'music',
      duration: '5:15',
      coverArt: '',
      genre: 'Synthwave'
    },
    {
      id: '4',
      title: 'The AI Chronicles',
      artist: 'Tech Talks',
      type: 'podcast',
      duration: '45:30',
      coverArt: '',
      genre: 'Technology'
    },
    {
      id: '5',
      title: 'Cyberpunk Cityscape',
      artist: 'Visual Arts',
      type: 'video',
      duration: '2:30',
      coverArt: '',
      genre: 'Visual'
    },
  ]

  const genres = ['all', 'Electronic', 'Ambient', 'Synthwave', 'Technology', 'Visual']

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <CyberGlassCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search media library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Genre Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-[#00BFFF] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CyberGlassCard>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <CyberGlassCard 
              className="p-4 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onMediaSelect(item)}
            >
              {/* Cover Art */}
              <div className="w-full aspect-square bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-lg mb-3 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-4xl">
                  {item.type === 'music' ? 'music_note' : 
                   item.type === 'video' ? 'movie' : 'podcasts'}
                </span>
              </div>
              
              {/* Media Info */}
              <div>
                <h3 className="font-semibold text-white truncate">{item.title}</h3>
                <p className="text-gray-400 text-sm truncate">{item.artist}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{item.duration}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.type === 'music' ? 'bg-[#00FFC2]/20 text-[#00FFC2]' :
                    item.type === 'video' ? 'bg-[#FF00E5]/20 text-[#FF00E5]' :
                    'bg-[#00BFFF]/20 text-[#00BFFF]'
                  }`}>
                    {item.type}
                  </span>
                </div>
              </div>
            </CyberGlassCard>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <CyberGlassCard className="p-12 text-center">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
            search_off
          </span>
          <h3 className="text-xl font-semibold text-white mb-2">No media found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </CyberGlassCard>
      )}
    </div>
  )
}

export default MediaLibrary