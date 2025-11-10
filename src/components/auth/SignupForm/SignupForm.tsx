'use client'

import React from 'react'
import { motion } from 'framer-motion'
import FormInput from '../../ui/FormInput/FormInput'
import PasswordStrength from '../../ui/PasswordStrength/PasswordStrength'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface SignupFormProps {
  onToggleMode: () => void
  onSubmit: (data: { email: string; password: string; username: string }) => void
  isLoading: boolean
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode, onSubmit, isLoading }) => {
  const {
    values,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    getPasswordStrength,
  } = useFormValidation({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    onSubmit,
  });

  const usernameProps = getFieldProps('username');
  const emailProps = getFieldProps('email');
  const passwordProps = getFieldProps('password');
  const confirmPasswordProps = getFieldProps('confirmPassword');
  const termsProps = getFieldProps('terms');

  const passwordStrength = getPasswordStrength(values.password);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Username Field */}
      <FormInput
        label="Operator Name"
        type="text"
        placeholder="quantum_operator"
        icon="badge"
        required
        {...usernameProps}
      />

      {/* Email Field */}
      <FormInput
        label="Quantum ID"
        type="email"
        placeholder="enter@nexus.quantum"
        icon="mail"
        required
        {...emailProps}
      />

      {/* Password Field */}
      <FormInput
        label="Encryption Key"
        type="password"
        placeholder="Create secure key"
        icon="password"
        required
        {...passwordProps}
      />

      {/* Password Strength Indicator */}
      {values.password && (
        <PasswordStrength
          strength={passwordStrength.strength}
          feedback={passwordStrength.feedback}
        />
      )}

      {/* Confirm Password Field */}
      <FormInput
        label="Confirm Encryption Key"
        type="password"
        placeholder="Re-enter secure key"
        icon="verified"
        required
        {...confirmPasswordProps}
      />

      {/* Terms Agreement */}
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={termsProps.value}
          onChange={(e) => termsProps.onChange(e.target.checked)}
          onBlur={termsProps.onBlur}
          className="w-4 h-4 mt-1 bg-white/5 border-white/10 rounded focus:ring-[#00BFFF] focus:ring-2"
        />
        <label className="ml-2 text-sm text-gray-300">
          I agree to the{' '}
          <button type="button" className="text-[#00BFFF] hover:text-[#00FFC2] transition-colors">
            Quantum Service Agreement
          </button>{' '}
          and{' '}
          <button type="button" className="text-[#00BFFF] hover:text-[#00FFC2] transition-colors">
            Data Encryption Protocol
          </button>
        </label>
      </div>

      {/* Terms Error */}
      {termsProps.hasError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center gap-2 text-[#FF00E5] text-sm"
        >
          <span className="material-symbols-outlined text-base">
            warning
          </span>
          <span>{termsProps.error}</span>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isLoading}
        whileHover={{ scale: (isSubmitting || isLoading) ? 1 : 1.02 }}
        whileTap={{ scale: (isSubmitting || isLoading) ? 1 : 0.98 }}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#00BFFF] to-[#00FFC2] text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00BFFF]/20"
      >
        {(isSubmitting || isLoading) ? (
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
            />
            Initializing Quantum Profile...
          </div>
        ) : (
          'Activate Nexus ID'
        )}
      </motion.button>

      {/* Toggle to Login */}
      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-[#FF00E5] hover:text-[#00BFFF] transition-colors font-medium"
        >
          Already have quantum access? Sign in
        </button>
      </div>
    </motion.form>
  )
}

export default SignupForm