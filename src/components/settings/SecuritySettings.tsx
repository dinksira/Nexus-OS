'use client';

import { useState } from 'react';
import type { SecuritySettings } from '@/types/settings';
import CyberToggle from "../ui/CyberToggle";

const initialSettings: SecuritySettings = {
  twoFactorEnabled: true,
  passwordLastChanged: new Date('2024-01-15'),
  privacyMode: false,
  dataEncryption: true,
  loginAlerts: true,
};

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>(initialSettings);

  const updateSetting = <K extends keyof SecuritySettings>(key: K, value: SecuritySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SecurityBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
    const colors = {
      high: 'from-green-500 to-cyan-500',
      medium: 'from-yellow-500 to-orange-500',
      low: 'from-red-500 to-pink-500'
    };

    return (
      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colors[level]} text-white text-xs font-bold`}>
        {level.toUpperCase()} SECURITY
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="cyber-text-lg font-bold text-white">Cyber Shield</h2>
        <SecurityBadge level="high" />
      </div>

      <div className="grid gap-6">
        {/* Security Status */}
        <div className="cyber-card p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">System Secure</h3>
              <p className="text-green-300 text-sm">All security measures are active</p>
            </div>
            <span className="material-symbols-outlined text-green-400 text-3xl">
              security
            </span>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Two-Factor Authentication</label>
              <p className="text-gray-400 text-sm">Add an extra layer of security</p>
            </div>
            <CyberToggle
              enabled={settings.twoFactorEnabled}
              onChange={(enabled) => updateSetting('twoFactorEnabled', enabled)}
            />
          </div>
        </div>

        {/* Password Management */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="block text-cyan-300 font-medium">Password</label>
              <p className="text-gray-400 text-sm">
                Last changed: {settings.passwordLastChanged.toLocaleDateString()}
              </p>
            </div>
            <button className="cyber-button-small bg-cyan-500/20 border-cyan-500">
              Change Password
            </button>
          </div>
        </div>

        {/* Privacy Mode */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Privacy Mode</label>
              <p className="text-gray-400 text-sm">Limit data collection and tracking</p>
            </div>
            <CyberToggle
              enabled={settings.privacyMode}
              onChange={(enabled) => updateSetting('privacyMode', enabled)}
            />
          </div>
        </div>

        {/* Data Encryption */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Data Encryption</label>
              <p className="text-gray-400 text-sm">Encrypt all stored data</p>
            </div>
            <CyberToggle
              enabled={settings.dataEncryption}
              onChange={(enabled) => updateSetting('dataEncryption', enabled)}
            />
          </div>
        </div>

        {/* Login Alerts */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Login Alerts</label>
              <p className="text-gray-400 text-sm">Get notified of new sign-ins</p>
            </div>
            <CyberToggle
              enabled={settings.loginAlerts}
              onChange={(enabled) => updateSetting('loginAlerts', enabled)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}