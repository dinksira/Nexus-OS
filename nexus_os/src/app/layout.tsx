import './globals.css'
import { Inter, Orbitron } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata = {
  title: 'Nexus OS Dashboard',
  description: 'A futuristic personal dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        {/* Remove the duplicate Material Icons import since it's in globals.css */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}