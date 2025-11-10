import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { compare } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('nexus_os')

    // Find user by email
    const user = await db.collection('users').findOne({ 
      email: email.toLowerCase() 
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create new session
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
    
    const session = {
      userId: user._id,
      token: sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      createdAt: new Date()
    }

    await db.collection('sessions').insertOne(session)

    // Update last login
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        preferences: user.preferences
      }
    })

    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}