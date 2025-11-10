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
  title: 'Nexus OS - Quantum Interface System',
  description: 'A futuristic personal dashboard with quantum-inspired design',
  icons: {
    icon: '/logo.png', // Favicon
    apple: '/logo.png', // Apple touch icon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}