import { ObjectId } from 'mongodb'

export interface CryptoAsset {
  _id?: ObjectId
  userId: ObjectId
  coinId: string
  symbol: string
  name: string
  targetPrice?: number
  notes?: string
  createdAt: Date
}

export interface CryptoPrice {
  _id?: ObjectId
  coinId: string
  price: number
  change24h: number
  marketCap: number
  lastUpdated: Date
}