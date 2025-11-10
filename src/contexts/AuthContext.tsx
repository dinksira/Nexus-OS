'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null) // ✅ Add this line

  const signup = async (userData: { email: string; password: string; username: string }): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user) // ✅ Now setUser is available
        return true
      } else {
        alert(data.error || 'Signup failed')
        return false
      }
    } catch (error) {
      console.error('Signup failed:', error)
      alert('Network error. Please try again.')
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user) // ✅ Now setUser is available
        return true
      } else {
        alert(data.error || 'Login failed')
        return false
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Network error. Please try again.')
      return false
    }
  }

  const logout = () => {
    setUser(null) // ✅ Add logout function
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register: signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}