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
    <html lang="id">
      <body className={geist.className + ' bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200'}>
        <ThemeProvider>
          <main className="pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            {children}
          </main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
