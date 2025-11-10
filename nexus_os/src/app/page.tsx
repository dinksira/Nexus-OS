'use client'

import { AppProvider } from '../contexts/AppContext'
import AnimatedBackground from '../components/layout/Background/AnimatedBackground'
import SideNavBar from '../components/layout/SideNavBar/SideNavBar'
import TopNavBar from '../components/layout/TopNavBar/TopNavBar'
import SmartTaskManager from '../components/widgets/SmartTaskManager/SmartTaskManager'
import HealthWellnessTracker from '../components/widgets/HealthWellnessTracker/HealthWellnessTracker'
import CryptoCommandCenter from '../components/widgets/CryptoCommandCenter/CryptoCommandCenter'
import MediaFusionPlayer from '../components/widgets/MediaFusionPlayer/MediaFusionPlayer'

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0A0A10] text-white overflow-hidden">
        <AnimatedBackground />
        
        <div className="flex h-screen p-4 gap-4">
          {/* Sidebar - Now collapsible */}
          <SideNavBar />
          
          {/* Main Content - Adjusts based on sidebar state */}
          <div className="flex-1 flex flex-col gap-4 transition-all duration-300">
            <TopNavBar />
            
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-y-auto">
              <SmartTaskManager />
              <HealthWellnessTracker />
              <CryptoCommandCenter />
              <MediaFusionPlayer />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  )
}