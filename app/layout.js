import { Geist } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/BottomNav'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'CryptoApp',
  description: 'Aplikasi crypto tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <main className="pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
