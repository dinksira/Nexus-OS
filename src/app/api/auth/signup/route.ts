import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hash } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json()

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('nexus_os')

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user document
    const newUser = {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      displayName: username,
      preferences: {
        theme: 'dark',
        sidebarCollapsed: false,
        notifications: true,
        blurIntensity: 20
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    }

    // Insert into database
    const result = await db.collection('users').insertOne(newUser)

    // Create user session (simplified - in production use proper sessions)
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
    
    const session = {
      userId: result.insertedId,
      token: sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      createdAt: new Date()
    }

    await db.collection('sessions').insertOne(session)

    // Create default widgets for new user
    const defaultWidgets = [
      {
        userId: result.insertedId,
        widgetType: 'tasks',
        position: { x: 0, y: 0, width: 1, height: 1 },
        settings: {},
        isVisible: true,
        createdAt: new Date()
      },
      {
        userId: result.insertedId,
        widgetType: 'crypto',
        position: { x: 1, y: 0, width: 1, height: 1 },
        settings: {},
        isVisible: true,
        createdAt: new Date()
      },
      {
        userId: result.insertedId,
        widgetType: 'health',
        position: { x: 0, y: 1, width: 1, height: 1 },
        settings: {},
        isVisible: true,
        createdAt: new Date()
      },
      {
        userId: result.insertedId,
        widgetType: 'media',
        position: { x: 1, y: 1, width: 1, height: 1 },
        settings: {},
        isVisible: true,
        createdAt: new Date()
      }
    ]

    await db.collection('widgets').insertMany(defaultWidgets)

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: result.insertedId,
        email: newUser.email,
        username: newUser.username,
        displayName: newUser.displayName,
        preferences: newUser.preferences
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
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}