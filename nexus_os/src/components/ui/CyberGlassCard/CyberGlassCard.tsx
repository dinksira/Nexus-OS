'use client'

import React from 'react';

interface CyberGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'pink' | 'blue' | 'mint' | 'none';
}

const CyberGlassCard: React.FC<CyberGlassCardProps> = ({ 
  children, 
  className = '',
  glowColor = 'none'
}) => {
  const glowClass = glowColor !== 'none' ? `holographic-glow-${glowColor}` : '';

  return (
    <div className={`cyber-glass rounded-xl ${glowClass} ${className}`}>
      {children}
    </div>
  );
};

export default CyberGlassCard;