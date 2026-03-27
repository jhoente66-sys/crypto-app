'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-50 pb-2">
      {menus.map((menu) => {
        const active = pathname === menu.href
        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={`flex-1 flex flex-col items-center pt-3 pb-1 gap-1 text-xs transition-colors
              ${active ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            {menu.icon(active)}
            <span className={active ? 'font-medium' : ''}>{menu.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
