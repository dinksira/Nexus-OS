'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FormInput from '../../ui/FormInput/FormInput'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface LoginFormProps {
  onToggleMode: () => void
  onSubmit: (data: { email: string; password: string }) => void
  isLoading: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, onSubmit, isLoading }) => {
  const {
    getFieldProps,
    handleSubmit,
    isSubmitting,
  } = useFormValidation({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit,
  });

  const emailProps = getFieldProps('email');
  const passwordProps = getFieldProps('password');
  const rememberMeProps = getFieldProps('rememberMe');

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email Field */}
      <FormInput
        label="Quantum ID"
        type="email"
        placeholder="enter@nexus.quantum"
        icon="person"
        required
        {...emailProps}
      />

      {/* Password Field */}
      <FormInput
        label="Encryption Key"
        type="password"
        placeholder="••••••••"
        icon="key"
        required
        {...passwordProps}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMeProps.value}
            onChange={(e) => rememberMeProps.onChange(e.target.checked)}
            className="w-4 h-4 bg-white/5 border-white/10 rounded focus:ring-[#FF00E5] focus:ring-2"
          />
          <span className="ml-2 text-sm text-gray-300">Remember this device</span>
        </label>
        <Link href="/forgot-password" className="text-sm text-[#00BFFF] hover:text-[#00FFC2] transition-colors">
          Key compromised?
        </Link>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isLoading}
        whileHover={{ scale: (isSubmitting || isLoading) ? 1 : 1.02 }}
        whileTap={{ scale: (isSubmitting || isLoading) ? 1 : 0.98 }}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#FF00E5] to-[#00BFFF] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF00E5]/20"
      >
        {(isSubmitting || isLoading) ? (
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            Quantum Authentication...
          </div>
        ) : (
          'Access Nexus'
        )}
      </motion.button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white/5 text-gray-400">Or</span>
        </div>
      </div>

      {/* Toggle to Signup */}
      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-[#00FFC2] hover:text-[#00BFFF] transition-colors font-medium"
        >
          Need quantum access? Create Nexus ID
        </button>
      </div>
    </motion.form>
  )
}

export default LoginForm