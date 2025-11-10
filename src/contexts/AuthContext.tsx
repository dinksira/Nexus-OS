const signup = async (userData: { email: string; password: string; username: string }): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (response.ok) {
      setUser(data.user)
      return true
    } else {
      // Show error message from server
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
      setUser(data.user)
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