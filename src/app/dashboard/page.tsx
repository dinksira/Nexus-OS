'use client'

import { AppProvider } from '../../contexts/AppContext'
import MainLayout from '../../components/layout/MainLayout/MainLayout'
import SmartTaskManager from '../../components/widgets/SmartTaskManager/SmartTaskManager'
import HealthWellnessTracker from '../../components/widgets/HealthWellnessTracker/HealthWellnessTracker'
import CryptoCommandCenter from '../../components/widgets/CryptoCommandCenter/CryptoCommandCenter'
import MediaFusionPlayer from '../../components/widgets/MediaFusionPlayer/MediaFusionPlayer'

export default function DashboardPage() {
  return (
    <AppProvider>
      <MainLayout>
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SmartTaskManager />
          <HealthWellnessTracker />
          <CryptoCommandCenter />
          <MediaFusionPlayer />
        </div>
      </MainLayout>
    </AppProvider>
  )
}