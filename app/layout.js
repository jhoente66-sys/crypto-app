import { Geist } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/BottomNav'
import { ThemeProvider } from '@/components/ThemeProvider'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'CryptoApp',
  description: 'Aplikasi crypto tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" style={{overflowX: 'hidden'}}>
      <body className={geist.className + ' bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200'} style={{overflowX: 'hidden', width: '100%', position: 'relative'}}>
        <ThemeProvider>
          <main className="pb-24 bg-gray-50 dark:bg-gray-950 min-h-screen w-full">
            {children}
          </main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
