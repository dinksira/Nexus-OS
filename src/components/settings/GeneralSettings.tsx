'use client';

import { useState } from 'react';

interface SystemSettings {
  language: string;
  timeFormat: '12h' | '24h';
  dateFormat: string;
  startupBehavior: 'minimized' | 'maximized' | 'remember';
  autoUpdates: boolean;
}

const initialSettings: SystemSettings = {
  language: 'en-US',
  timeFormat: '12h',
  dateFormat: 'MM/DD/YYYY',
  startupBehavior: 'remember',
  autoUpdates: true,
};

// CyberToggle component defined inline for now
function CyberToggle({ 
  enabled, 
  onChange 
}: { 
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
        enabled 
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
          : 'bg-gray-600'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
          enabled 
            ? 'transform translate-x-6' 
            : 'transform translate-x-1'
        }`}
      />
      {enabled && (
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-pulse"></div>
      )}
    </button>
  );
}

export default function GeneralSettings() {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);

  const updateSetting = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          System Core
        </h2>
        <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full ml-4"></div>
      </div>

      <div className="grid gap-6">
        {/* Language */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-3">System Language</label>
          <select 
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            className="cyber-input w-full"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="ja-JP">Japanese</option>
          </select>
        </div>

        {/* Time Format */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-3">Time Format</label>
          <div className="flex space-x-4">
            {(['12h', '24h'] as const).map((format) => (
              <button
                key={format}
                onClick={() => updateSetting('timeFormat', format)}
                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${
                  settings.timeFormat === format
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                    : 'border-gray-600 hover:border-cyan-500/50'
                }`}
              >
                <span className="text-white font-medium">{format}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Startup Behavior */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-3">Startup Behavior</label>
          <select 
            value={settings.startupBehavior}
            onChange={(e) => updateSetting('startupBehavior', e.target.value as any)}
            className="cyber-input w-full"
          >
            <option value="minimized">Start Minimized</option>
            <option value="maximized">Start Maximized</option>
            <option value="remember">Remember Last State</option>
          </select>
        </div>

        {/* Auto Updates */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Automatic Updates</label>
              <p className="text-gray-400 text-sm">Keep Nexus OS updated automatically</p>
            </div>
            <CyberToggle
              enabled={settings.autoUpdates}
              onChange={(enabled) => updateSetting('autoUpdates', enabled)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}