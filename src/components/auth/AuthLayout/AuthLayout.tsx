'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#0A0A10] text-white overflow-hidden relative">
      {/* Your existing background code */}
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo Header - Updated with your logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Nexus OS"
                width={80}
                height={80}
                className="object-contain drop-shadow-2xl"
                priority
              />
              {/* Optional glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5] to-[#00BFFF] rounded-full blur-xl opacity-30 -z-10 w-24 h-24" />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Nexus OS
            </h1>
            <p className="text-gray-400 text-lg">Quantum Interface System</p>
          </motion.div>

          {/* Rest of your auth layout remains the same */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl shadow-[#FF00E5]/10"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {title}
              </h2>
              <p className="text-gray-400">{subtitle}</p>
            </div>

            {children}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6 text-gray-400 text-sm"
          >
            <p>Secure Access • Quantum Encrypted • v2.1</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout