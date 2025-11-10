'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import CyberGlassCard from '../../../components/ui/CyberGlassCard/CyberGlassCard'
import { LogoIcon } from '../../../components/Logo/Logo'

const SideNavBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true) // Start collapsed
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: 'grid_view', label: 'Dashboard', path: '/dashboard' },
    { icon: 'analytics', label: 'Analytics', path: '/analytics' },
    { icon: 'perm_media', label: 'Media', path: '/media' },
    { icon: 'calendar_today', label: 'Calendar', path: '/calendar' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    // If manually expanding, disable hover effect
    if (!isCollapsed) {
      setIsHovered(false)
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Determine if content should be visible (expanded state)
  const shouldShowContent = !isCollapsed || isHovered

  return (
    <div 
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CyberGlassCard 
        className={`h-full flex flex-col justify-between p-4 shrink-0 transition-all duration-300 ${
          shouldShowContent ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 transition-all duration-300 ${
              shouldShowContent ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}>
              <LogoIcon size={32} />
              <h1 className="text-2xl font-bold whitespace-nowrap" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Nexus
              </h1>
            </div>
            
            {/* Toggle Button - Only show when not auto-expanded by hover */}
            {!isHovered && (
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0 ml-2"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <span className="material-symbols-outlined text-white text-lg transition-transform duration-300">
                  {isCollapsed ? 'chevron_right' : 'chevron_left'}
                </span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center rounded-lg transition-all duration-200 group relative ${
                  isActive(item.path)
                    ? 'bg-white/10 border border-white/20' 
                    : 'hover:bg-white/10'
                } ${
                  shouldShowContent ? 'px-3 py-2 justify-start' : 'p-3 justify-center'
                }`}
                title={!shouldShowContent ? item.label : ''}
              >
                <span className={`material-symbols-outlined text-2xl shrink-0 ${
                  isActive(item.path) ? 'text-[#00BFFF]' : 'text-white'
                }`}>
                  {item.icon}
                </span>
                
                {/* Label */}
                <span className={`transition-all duration-300 whitespace-nowrap ${
                  shouldShowContent 
                    ? 'opacity-100 ml-3 w-auto' 
                    : 'opacity-0 ml-0 w-0'
                } ${isActive(item.path) ? 'text-white font-semibold' : 'text-white/70'}`}>
                  {item.label}
                </span>

                {/* Tooltip for collapsed non-hovered state */}
                {!shouldShowContent && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}

                {/* Active indicator dot for collapsed state */}
                {!shouldShowContent && isActive(item.path) && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#00BFFF] rounded-full holographic-glow-blue" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* System Status */}
        <div className={`flex items-center border-t border-white/20 pt-4 ${
          shouldShowContent ? 'gap-3' : 'justify-center'
        }`}>
          <div className="relative shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#00FFC2] absolute -top-1 -right-1 holographic-glow-mint" />
            <span className="material-symbols-outlined text-[#00FFC2]">
              signal_cellular_alt
            </span>
          </div>
          
          {/* Status Text */}
          <div className={`transition-all duration-300 overflow-hidden ${
            shouldShowContent ? 'opacity-100 w-auto' : 'opacity-0 w-0'
          }`}>
            <p className="text-white text-sm font-medium whitespace-nowrap">
              System Status
            </p>
            <p className="text-gray-400 text-xs whitespace-nowrap">
              All Systems Online
            </p>
          </div>

          {/* Tooltip for system status */}
          {!shouldShowContent && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
              <p className="font-medium">System Status</p>
              <p className="text-[#00FFC2] text-xs">All Systems Online</p>
            </div>
          )}
        </div>
      </CyberGlassCard>
    </div>
  )
}

export default SideNavBar