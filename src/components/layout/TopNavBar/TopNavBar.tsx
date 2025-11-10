'use client'

import React, { useState } from 'react'
import CyberGlassCard from '../../../components/ui/CyberGlassCard/CyberGlassCard'
import { LogoIcon } from '../../../components/Logo/Logo'

const TopNavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <CyberGlassCard className="w-full h-16 px-6 shrink-0">
      <div className="flex items-center justify-between h-full">
        {/* Logo on the left */}
        <div className="flex items-center gap-4">
          <LogoIcon size={28} />
          <div className="hidden md:block">
            <span 
              className="text-lg font-bold bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Nexus OS
            </span>
          </div>
        </div>

        {/* Search Bar - Centered */}
        <div className="flex-1 max-w-md mx-8">
          <div className="flex items-center">
            <span className="material-symbols-outlined text-gray-400 text-xl mr-3">
              search
            </span>
            <input
              type="text"
              placeholder="Query the Nexus AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-base"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-white/10 hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-white">
                notifications
              </span>
            </button>
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-white/10 hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-white">
                settings
              </span>
            </button>
          </div>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] border-2 border-white/20 holographic-glow-pink" />
        </div>
      </div>
    </CyberGlassCard>
  )
}

export default TopNavBar