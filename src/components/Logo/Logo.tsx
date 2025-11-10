'use client'

import React from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({ 
  size = 40, 
  showText = true, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Nexus OS Logo"
          width={size}
          height={size}
          className="object-contain drop-shadow-2xl"
          priority
        />
        
        {/* Optional Glow Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-full blur-sm opacity-30 -z-10"
          style={{ width: size, height: size }}
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <span 
          className="text-2xl font-bold bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Nexus OS
        </span>
      )}
    </div>
  )
}

// Individual logo without text
export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 32, 
  className = '' 
}) => {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Nexus OS"
        width={size}
        height={size}
        className="object-contain drop-shadow-lg"
      />
    </div>
  )
}

export default Logo