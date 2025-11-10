'use client'

import React from 'react'
import AnimatedBackground from '../Background/AnimatedBackground'
import SideNavBar from '../SideNavBar/SideNavBar'
import TopNavBar from '../TopNavBar/TopNavBar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A0A10] text-white overflow-hidden">
      <AnimatedBackground />
      
      <div className="flex h-screen p-4 gap-4">
        {/* Single Sidebar Instance */}
        <SideNavBar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <TopNavBar />
          
          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout