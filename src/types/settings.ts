export interface SystemSettings {
  language: string;
  timeFormat: '12h' | '24h';
  dateFormat: string;
  startupBehavior: 'minimized' | 'maximized' | 'remember';
  autoUpdates: boolean;
}

export interface AppearanceSettings {
  theme: 'dark' | 'light' | 'auto';
  accentColor: string;
  glassEffect: boolean;
  blurIntensity: number;
  animations: boolean;
}

export interface AccountSettings {
  username: string;
  email: string;
  avatar: string;
  syncEnabled: boolean;
  syncInterval: number;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: Date;
  privacyMode: boolean;
  dataEncryption: boolean;
  loginAlerts: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  desktopAlerts: boolean;
  priorityMode: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface SystemPerformance {
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkStatus: 'online' | 'offline' | 'limited';
}

export type SettingsTab = 'general' | 'appearance' | 'account' | 'security' | 'notifications' | 'system';