'use client'

import React from 'react';
import CyberGlassCard from '../../ui/CyberGlassCard/CyberGlassCard';

interface WidgetContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <CyberGlassCard className={`p-6 flex flex-col gap-4 ${className}`}>
      <h2 
        className="text-white text-xl font-bold leading-tight"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        {title}
      </h2>
      {children}
    </CyberGlassCard>
  );
};

export default WidgetContainer;