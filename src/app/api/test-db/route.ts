// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('nexus_os')
    
    // Test connection
    const pingResult = await db.command({ ping: 1 })
    
    // Ensure collections exist (they'll be created automatically on first insert)
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)
    
    return NextResponse.json({ 
      success: true,
      message: '✅ MongoDB connection successful!',
      database: 'nexus_os',
      collections: collectionNames,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('MongoDB connection error:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 })
  }
}