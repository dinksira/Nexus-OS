'use client';

import { useState } from 'react';
import { AppProvider } from '../../contexts/AppContext';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import GeneralSettings from '../../components/settings/GeneralSettings';
import AppearanceSettings from '../../components/settings/AppearanceSettings';
import AccountSettings from '../../components/settings/AccountSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import SystemSettings from '../../components/settings/SystemSettings';
import SettingsControls from '../../components/settings/SettingsControls';

const settingsTabs = [
  { id: 'general', label: 'System Core', icon: '⚙️' },
  { id: 'appearance', label: 'Visual Matrix', icon: '🎨' },
  { id: 'account', label: 'User Profile', icon: '👤' },
  { id: 'security', label: 'Cyber Shield', icon: '🛡️' },
  { id: 'notifications', label: 'Alert System', icon: '🔔' },
  { id: 'system', label: 'Performance', icon: '💾' }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'account':
        return <AccountSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'system':
        return <SystemSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <AppProvider>
      <MainLayout>
        <div className="min-h-screen bg-[#0A0A10] p-6 font-['Inter']">
          {/* Header */}
          <div className="mb-8">
            <div className="cyber-glass rounded-2xl p-6 border border-cyan-500/30">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2 font-['Orbitron']">
                Quantum Settings
              </h1>
              <p className="text-cyan-200/80 font-light">
                Configure your Nexus OS experience with precision control
              </p>
            </div>
          </div>

          {/* Settings Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* LEFT SIDEBAR - Settings Categories */}
            <div className="xl:col-span-1">
              <div className="cyber-glass rounded-2xl p-4 border border-purple-500/30">
                <div className="space-y-2">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                          : 'bg-transparent hover:bg-white/5 border border-transparent hover:border-cyan-500/20'
                      }`}
                    >
                      <span className="text-cyan-400 text-lg">{tab.icon}</span>
                      <span className="text-white font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER - Settings Content */}
            <div className="xl:col-span-2">
              <div className="cyber-glass rounded-2xl p-6 border border-cyan-500/30">
                {renderActiveTab()}
              </div>
            </div>

            {/* RIGHT SIDEBAR - Quick Controls */}
            <div className="xl:col-span-1">
              <SettingsControls />
            </div>
          </div>
        </div>
      </MainLayout>
    </AppProvider>
  );
}