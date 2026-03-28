'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

export default function BottomNav() {
  const pathname = usePathname()
  const { dark, toggle } = useTheme()

  const menus = [
    {
      label: 'Beranda',
      href: '/',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12L12 4l9 8"/>
          <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
        </svg>
      )
    },
    {
      label: 'Pasar',
      href: '/pasar',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          <polyline points="16 7 22 7 22 13"/>
        </svg>
      )
    },
    {
      label: 'Konversi',
      href: '/konversi',
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16V4m0 0L3 8m4-4l4 4"/>
          <path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
        </svg>
      )
    },
  ]

  return (
    <nav style={{transform: 'translateZ(0)'}} className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex z-[9999] pb-2">
      {menus.map((menu) => {
        const active = pathname === menu.href
        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={'flex-1 flex flex-col items-center pt-3 pb-1 gap-1 text-xs transition-colors ' + (active ? 'text-emerald-600' : 'text-gray-400 dark:text-gray-500')}
          >
            {menu.icon(active)}
            <span className={active ? 'font-medium' : ''}>{menu.label}</span>
          </Link>
        )
      })}
      <button
        onClick={toggle}
        className="flex-1 flex flex-col items-center pt-3 pb-1 gap-1 text-xs text-gray-400 dark:text-gray-500"
      >
        {dark ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        )}
        <span>{dark ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  )
}
