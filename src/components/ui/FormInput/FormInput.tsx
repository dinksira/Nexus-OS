'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  hasError?: boolean;
  placeholder?: string;
  icon?: string;
  required?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  hasError = false,
  placeholder,
  icon,
  required = false,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-[#FF00E5]">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 transition-all duration-300
            ${hasError 
              ? 'border-[#FF00E5] focus:ring-[#FF00E5] focus:border-[#FF00E5]' 
              : 'border-white/10 focus:ring-[#00BFFF] focus:border-[#00BFFF]'
            }
          `}
        />
        
        {icon && (
          <div className={`absolute right-3 top-3 ${
            hasError ? 'text-[#FF00E5]' : 'text-[#00BFFF]'
          }`}>
            <span className="material-symbols-outlined text-lg">
              {icon}
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <div className="flex items-center gap-2 text-[#FF00E5] text-sm">
              <span className="material-symbols-outlined text-base">
                warning
              </span>
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;