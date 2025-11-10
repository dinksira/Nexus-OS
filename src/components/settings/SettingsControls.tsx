'use client';

import { useState } from 'react';

export default function SettingsControls() {
  const [quickSettings, setQuickSettings] = useState({
    darkMode: true,
    doNotDisturb: false,
    autoSync: true,
    batterySaver: false,
  });

  const toggleQuickSetting = (setting: keyof typeof quickSettings) => {
    setQuickSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const QuickToggle = ({ 
    enabled, 
    onChange, 
    icon, 
    label 
  }: { 
    enabled: boolean;
    onChange: () => void;
    icon: string;
    label: string;
  }) => (
    <button
      onClick={onChange}
      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
        enabled
          ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/10'
          : 'bg-gray-800/50 border-gray-600 hover:border-cyan-500/30'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className={`material-symbols-outlined ${
          enabled ? 'text-cyan-400' : 'text-gray-400'
        }`}>
          {icon}
        </span>
        <span className="text-white font-medium text-sm">{label}</span>
      </div>
      <div className={`w-10 h-6 rounded-full transition-all ${
        enabled ? 'bg-cyan-500' : 'bg-gray-600'
      }`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
          enabled ? 'transform translate-x-5' : 'transform translate-x-1'
        }`}></div>
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Quick Settings */}
      <div className="cyber-glass rounded-2xl p-4 border border-cyan-500/30">
        <h3 className="text-cyan-300 font-bold mb-4">Quick Settings</h3>
        <div className="space-y-3">
          <QuickToggle
            enabled={quickSettings.darkMode}
            onChange={() => toggleQuickSetting('darkMode')}
            icon="dark_mode"
            label="Dark Mode"
          />
          <QuickToggle
            enabled={quickSettings.doNotDisturb}
            onChange={() => toggleQuickSetting('doNotDisturb')}
            icon="do_not_disturb"
            label="Do Not Disturb"
          />
          <QuickToggle
            enabled={quickSettings.autoSync}
            onChange={() => toggleQuickSetting('autoSync')}
            icon="sync"
            label="Auto Sync"
          />
          <QuickToggle
            enabled={quickSettings.batterySaver}
            onChange={() => toggleQuickSetting('batterySaver')}
            icon="battery_saver"
            label="Battery Saver"
          />
        </div>
      </div>

      {/* System Status */}
      <div className="cyber-glass rounded-2xl p-4 border border-green-500/30">
        <h3 className="text-green-300 font-bold mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300 text-sm">System Health</span>
            <span className="text-green-400 font-bold text-sm">Optimal</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300 text-sm">Last Backup</span>
            <span className="text-cyan-400 font-bold text-sm">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300 text-sm">Security</span>
            <span className="text-green-400 font-bold text-sm">Active</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300 text-sm">Updates</span>
            <span className="text-yellow-400 font-bold text-sm">Available</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="cyber-glass rounded-2xl p-4 border border-purple-500/30">
        <h3 className="text-purple-300 font-bold mb-4">Quick Actions</h3>
        <div className="grid gap-3">
          <button className="cyber-button-small bg-cyan-500/20 border-cyan-500">
            <span className="material-symbols-outlined text-sm mr-2">backup</span>
            Backup Now
          </button>
          <button className="cyber-button-small bg-green-500/20 border-green-500">
            <span className="material-symbols-outlined text-sm mr-2">restore</span>
            Restore Backup
          </button>
          <button className="cyber-button-small bg-purple-500/20 border-purple-500">
            <span className="material-symbols-outlined text-sm mr-2">refresh</span>
            Reset Settings
          </button>
          <button className="cyber-button-small bg-red-500/20 border-red-500">
            <span className="material-symbols-outlined text-sm mr-2">logout</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Save/Cancel */}
      <div className="cyber-glass rounded-2xl p-4 border border-cyan-500/30">
        <div className="grid grid-cols-2 gap-3">
          <button className="cyber-button bg-cyan-500/20 border-cyan-500 hover:bg-cyan-500/30">
            <span className="material-symbols-outlined text-sm mr-2">save</span>
            Save Changes
          </button>
          <button className="cyber-button bg-gray-600/50 border-gray-500 hover:bg-gray-600/70">
            <span className="material-symbols-outlined text-sm mr-2">cancel</span>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}