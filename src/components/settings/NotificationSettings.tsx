'use client';

import { useState } from 'react';
import type { NotificationSettings } from '@/types/settings';
import CyberToggle from "../ui/CyberToggle";

const initialSettings: NotificationSettings = {
  enabled: true,
  sound: true,
  vibration: false,
  desktopAlerts: true,
  priorityMode: false,
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '07:00',
  },
};

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings);

  const updateSetting = <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateQuietHours = (key: 'enabled' | 'start' | 'end', value: any) => {
    setSettings(prev => ({
      ...prev,
      quietHours: { ...prev.quietHours, [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="cyber-text-lg font-bold text-white">Alert System</h2>
        <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full ml-4"></div>
      </div>

      <div className="grid gap-6">
        {/* Global Notifications */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-cyan-300 font-medium">Enable Notifications</label>
              <p className="text-gray-400 text-sm">Receive system and app alerts</p>
            </div>
            <CyberToggle
              enabled={settings.enabled}
              onChange={(enabled) => updateSetting('enabled', enabled)}
            />
          </div>
        </div>

        {settings.enabled && (
          <>
            {/* Sound */}
            <div className="cyber-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-cyan-300 font-medium">Sound Alerts</label>
                  <p className="text-gray-400 text-sm">Play sounds for notifications</p>
                </div>
                <CyberToggle
                  enabled={settings.sound}
                  onChange={(enabled) => updateSetting('sound', enabled)}
                />
              </div>
            </div>

            {/* Vibration */}
            <div className="cyber-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-cyan-300 font-medium">Haptic Feedback</label>
                  <p className="text-gray-400 text-sm">Vibrate for notifications</p>
                </div>
                <CyberToggle
                  enabled={settings.vibration}
                  onChange={(enabled) => updateSetting('vibration', enabled)}
                />
              </div>
            </div>

            {/* Desktop Alerts */}
            <div className="cyber-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-cyan-300 font-medium">Desktop Notifications</label>
                  <p className="text-gray-400 text-sm">Show alerts on desktop</p>
                </div>
                <CyberToggle
                  enabled={settings.desktopAlerts}
                  onChange={(enabled) => updateSetting('desktopAlerts', enabled)}
                />
              </div>
            </div>

            {/* Priority Mode */}
            <div className="cyber-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-cyan-300 font-medium">Priority Mode</label>
                  <p className="text-gray-400 text-sm">Only show important notifications</p>
                </div>
                <CyberToggle
                  enabled={settings.priorityMode}
                  onChange={(enabled) => updateSetting('priorityMode', enabled)}
                />
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="cyber-card p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-cyan-300 font-medium">Quiet Hours</label>
                  <p className="text-gray-400 text-sm">Silence notifications during specific times</p>
                </div>
                <CyberToggle
                  enabled={settings.quietHours.enabled}
                  onChange={(enabled) => updateQuietHours('enabled', enabled)}
                />
              </div>

              {settings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 text-sm mb-2">Start Time</label>
                    <input
                      type="time"
                      value={settings.quietHours.start}
                      onChange={(e) => updateQuietHours('start', e.target.value)}
                      className="cyber-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-300 text-sm mb-2">End Time</label>
                    <input
                      type="time"
                      value={settings.quietHours.end}
                      onChange={(e) => updateQuietHours('end', e.target.value)}
                      className="cyber-input w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}