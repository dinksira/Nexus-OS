'use client';

interface CyberToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function CyberToggle({ enabled, onChange, size = 'md' }: CyberToggleProps) {
  const sizes = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8'
  };

  const knobSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const translateX = {
    sm: enabled ? 'translate-x-5' : 'translate-x-1',
    md: enabled ? 'translate-x-6' : 'translate-x-1',
    lg: enabled ? 'translate-x-7' : 'translate-x-1'
  };

  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`${sizes[size]} rounded-full transition-all duration-300 relative ${
        enabled 
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
          : 'bg-gray-600'
      }`}
    >
      <div
        className={`${knobSizes[size]} rounded-full bg-white transition-transform duration-300 ${translateX[size]}`}
      />
      {enabled && (
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-pulse"></div>
      )}
    </button>
  );
}