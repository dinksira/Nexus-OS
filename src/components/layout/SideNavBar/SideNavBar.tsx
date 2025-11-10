'use client'

import React, { useState, useRef } from 'react';
import CyberGlassCard from '../../../components/ui/CyberGlassCard/CyberGlassCard';

const SideNavBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed by default
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: 'grid_view', label: 'Dashboard', isActive: true },
    { icon: 'analytics', label: 'Analytics' },
    { icon: 'perm_media', label: 'Media' },
    { icon: 'calendar_today', label: 'Calendar' },
    { icon: 'settings', label: 'Settings' },
  ];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // If manually toggling to expanded, disable hover effect temporarily
    if (isCollapsed) {
      setIsHovered(false);
    }
  };

  // Determine the actual width based on state
  const getSidebarWidth = () => {
    if (isHovered && isCollapsed) {
      return 'w-64'; // Expanded on hover
    }
    return isCollapsed ? 'w-16' : 'w-64';
  };

  // Determine if content should be visible
  const shouldShowContent = !isCollapsed || isHovered;

  return (
    <div 
      ref={sidebarRef}
      className="relative h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CyberGlassCard 
        className={`h-full flex flex-col justify-between p-4 shrink-0 transition-all duration-300 ${getSidebarWidth()}`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between text-white">
            <div className={`flex items-center gap-4 transition-all duration-300 ${
              shouldShowContent ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}>
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <h1 
                className="text-2xl font-bold whitespace-nowrap transition-all duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Nexus
              </h1>
            </div>
            
            {/* Toggle Button - Always visible */}
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0 ml-2"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className="material-symbols-outlined text-white text-lg transition-transform duration-300">
                {isCollapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center rounded-lg transition-all duration-200 group ${
                  item.isActive 
                    ? 'bg-white/10 border border-white/20' 
                    : 'hover:bg-white/10'
                } ${
                  shouldShowContent ? 'px-3 py-2 justify-start' : 'p-3 justify-center'
                }`}
                title={!shouldShowContent ? item.label : ''}
              >
                <span className="material-symbols-outlined text-white text-2xl shrink-0">
                  {item.icon}
                </span>
                
                {/* Label */}
                <span className={`text-white text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  shouldShowContent 
                    ? 'opacity-100 ml-3 w-auto' 
                    : 'opacity-0 ml-0 w-0'
                }`}>
                  {item.label}
                </span>

                {/* Tooltip for collapsed non-hovered state */}
                {!shouldShowContent && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
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
  );
};

export default SideNavBar;