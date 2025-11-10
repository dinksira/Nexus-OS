'use client'

import React, { useState, useEffect } from 'react'

const AnimatedBackground: React.FC = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate consistent particle data that's the same on server and client
  const particleData = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    // Use consistent values that don't change between server and client
    left: `${(i * 37) % 100}%`, // Deterministic based on index
    top: `${(i * 23) % 100}%`, // Deterministic based on index
    delay: `${(i * 2.5) % 6}s`, // Spread out but consistent
    duration: `${3 + (i % 4)}s`, // Between 3-6s but consistent
  }))

  return (
    <div className="fixed inset-0 z-[-1]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436a0976f2?q=80&w=2070&auto=format&fit=crop')`
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20">
        {/* Floating Particles - Only render on client to avoid hydration issues */}
        {isClient && (
          <div className="absolute inset-0">
            {particleData.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 float-animation"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
        )}

        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  )
}

export default AnimatedBackground