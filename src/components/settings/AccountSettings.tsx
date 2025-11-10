'use client';

import { useState } from 'react';
import type { AccountSettings } from '@/types/settings';
import CyberToggle from '../ui/CyberToggle';

const initialSettings: AccountSettings = {
  username: 'quantum_user',
  email: 'user@nexusos.com',
  avatar: '',
  syncEnabled: true,
  syncInterval: 30,
};

export default function AccountSettings() {
  const [settings, setSettings] = useState<AccountSettings>(initialSettings);

  const updateSetting = <K extends keyof AccountSettings>(key: K, value: AccountSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="cyber-text-lg font-bold text-white">User Profile</h2>
        <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full ml-4"></div>
      </div>

      <div className="grid gap-6">
        {/* Avatar */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-4">Profile Avatar</label>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl">
                person
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="cyber-button-small bg-cyan-500/20 border-cyan-500">
                <span className="material-symbols-outlined text-sm mr-2">upload</span>
                Upload
              </button>
              <button className="cyber-button-small bg-purple-500/20 border-purple-500">
                <span className="material-symbols-outlined text-sm mr-2">edit</span>
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-3">Username</label>
          <input
            type="text"
            value={settings.username}
            onChange={(e) => updateSetting('username', e.target.value)}
            className="cyber-input w-full"
            placeholder="Enter your username"
          />
        </div>

        {/* Email */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-3">Email Address</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => updateSetting('email', e.target.value)}
            className="cyber-input w-full"
            placeholder="Enter your email"
          />
        </div>

        {/* Sync Settings */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="block text-cyan-300 font-medium">Cloud Sync</label>
              <p className="text-gray-400 text-sm">Sync your settings across devices</p>
            </div>
            <CyberToggle
              enabled={settings.syncEnabled}
              onChange={(enabled) => updateSetting('syncEnabled', enabled)}
            />
          </div>

          {settings.syncEnabled && (
            <div>
              <label className="block text-cyan-300 font-medium mb-3">
                Sync Interval: {settings.syncInterval} minutes
              </label>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={settings.syncInterval}
                onChange={(e) => updateSetting('syncInterval', Number(e.target.value))}
                className="w-full cyber-slider"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}