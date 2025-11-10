'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  strength: number;
  feedback: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength, feedback }) => {
  const getStrengthColor = (strength: number) => {
    if (strength < 40) return '#FF00E5'; // Weak - Pink
    if (strength < 70) return '#FFA500'; // Medium - Orange
    if (strength < 90) return '#00BFFF'; // Strong - Blue
    return '#00FFC2'; // Very Strong - Mint
  };

  const getStrengthLabel = (strength: number) => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    if (strength < 90) return 'Strong';
    return 'Quantum Grade';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3"
    >
      {/* Strength Bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Encryption Strength</span>
        <span 
          className="text-xs font-medium"
          style={{ color: getStrengthColor(strength) }}
        >
          {getStrengthLabel(strength)}
        </span>
      </div>
      
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full transition-all duration-300"
          style={{ backgroundColor: getStrengthColor(strength) }}
        />
      </div>
      
      {/* Feedback */}
      {feedback && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400 mt-2"
        >
          {feedback}
        </motion.p>
      )}
    </motion.div>
  );
};

export default PasswordStrength;