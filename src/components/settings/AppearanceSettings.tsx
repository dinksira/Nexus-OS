'use client';

import { useState } from 'react';
import { AppearanceSettings } from '@/types/settings';

const initialSettings: AppearanceSettings = {
  theme: 'dark',
  accentColor: '#00BFFF',
  glassEffect: true,
  blurIntensity: 8,
  animations: true,
};

const accentColors = [
  { name: 'Quantum Blue', value: '#00BFFF' },
  { name: 'Neon Pink', value: '#FF00E5' },
  { name: 'Cyber Green', value: '#00FFC2' },
  { name: 'Purple Haze', value: '#8A2BE2' },
  { name: 'Solar Orange', value: '#FF6B35' },
];

export default function AppearanceSettings() {
  const [settings, setSettings] = useState<AppearanceSettings>(initialSettings);

  const updateSetting = <K extends keyof AppearanceSettings>(key: K, value: AppearanceSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="cyber-text-lg font-bold text-white">Visual Matrix</h2>
        <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full ml-4"></div>
      </div>

      <div className="grid gap-6">
        {/* Theme Selection */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-4">Interface Theme</label>
          <div className="grid grid-cols-3 gap-4">
            {(['dark', 'light', 'auto'] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => updateSetting('theme', theme)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.theme === theme
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                    : 'border-gray-600 hover:border-cyan-500/50'
                }`}
              >
                <div className={`w-full h-12 rounded-lg mb-2 ${
                  theme === 'dark' ? 'bg-gray-800' : 
                  theme === 'light' ? 'bg-gray-200' : 
                  'bg-gradient-to-r from-gray-800 to-gray-200'
                }`}></div>
                <span className="text-white text-sm font-medium capitalize">{theme}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="cyber-card p-4">
          <label className="block text-cyan-300 font-medium mb-4">Accent Color</label>
          <div className="grid grid-cols-5 gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => updateSetting('accentColor', color.value)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  settings.accentColor === color.value
                    ? 'border-white shadow-lg scale-110'
                    : 'border-gray-600 hover:border-white/50'
                }`}
                style={{ backgroundColor: color.value }}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Glass Effect */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Glass Morphism</label>
              <p className="text-gray-400 text-sm">Enable translucent glass effects</p>
            </div>
            <CyberToggle
              enabled={settings.glassEffect}
              onChange={(enabled) => updateSetting('glassEffect', enabled)}
            />
          </div>
        </div>

        {/* Blur Intensity */}
        {settings.glassEffect && (
          <div className="cyber-card p-4">
            <label className="block text-cyan-300 font-medium mb-4">
              Blur Intensity: {settings.blurIntensity}px
            </label>
            <input
              type="range"
              min="2"
              max="20"
              value={settings.blurIntensity}
              onChange={(e) => updateSetting('blurIntensity', Number(e.target.value))}
              className="w-full cyber-slider"
            />
          </div>
        )}

        {/* Animations */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Smooth Animations</label>
              <p className="text-gray-400 text-sm">Enable interface animations</p>
            </div>
            <CyberToggle
              enabled={settings.animations}
              onChange={(enabled) => updateSetting('animations', enabled)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}