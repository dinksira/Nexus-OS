import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session_token')?.value

    if (!token) {
      return NextResponse.json(null)
    }

    const client = await clientPromise
    const db = client.db('nexus_os')

    const session = await db.collection('sessions').findOne({
      token,
      expiresAt: { $gt: new Date() }
    })

    if (!session) {
      return NextResponse.json(null)
    }

    const user = await db.collection('users').findOne(
      { _id: session.userId },
      { projection: { password: 0 } }
    )

    return NextResponse.json(user)
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(null)
  }
}