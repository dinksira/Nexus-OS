'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AuthLayout from '../../components/auth/AuthLayout/AuthLayout'
import LoginForm from '../../components/auth/LoginForm/LoginForm'
import SignupForm from '../../components/auth/SignupForm/SignupForm'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  const handleAuthSubmit = async (data: any) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to dashboard on success
    router.push('/dashboard')
    
    setIsLoading(false)
  }

  return (
    <AuthLayout
      title={isLogin ? 'Quantum Access' : 'Activate Nexus ID'}
      subtitle={isLogin 
        ? 'Enter your credentials to access the quantum interface' 
        : 'Create your quantum operator profile'
      }
    >
      <AnimatePresence mode="wait">
        {isLogin ? (
          <LoginForm
            key="login"
            onToggleMode={toggleMode}
            onSubmit={handleAuthSubmit}
            isLoading={isLoading}
          />
        ) : (
          <SignupForm
            key="signup"
            onToggleMode={toggleMode}
            onSubmit={handleAuthSubmit}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}