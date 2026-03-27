'use client'
import { useEffect, useState } from 'react'

export default function Beranda() {
  const [global, setGlobal] = useState(null)
  const [fearGreed, setFearGreed] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [globalRes, fgRes] = await Promise.all([
          fetch('/api/global'),
          fetch('/api/feargreed')
        ])
        const globalData = await globalRes.json()
        const fgData = await fgRes.json()
        setGlobal(globalData.data)
        setFearGreed(fgData.data[0])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatCap = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
    return `$${num}`
  }

  const fgColor = (val) => {
    if (val >= 60) return 'text-emerald-600'
    if (val >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const fgLabel = (val) => {
    if (val >= 75) return 'Extreme Greed'
    if (val >= 60) return 'Greed'
    if (val >= 40) return 'Netral'
    if (val >= 25) return 'Fear'
    return 'Extreme Fear'
  }

  const news = [
    { coin: 'BTC', sentiment: 'Bullish', title: 'Bitcoin tembus level $65K untuk pertama kali minggu ini', source: 'CoinDesk', time: '5m lalu', coinColor: 'bg-amber-100 text-amber-800', sentColor: 'bg-green-100 text-green-800' },
    { coin: 'ETH', sentiment: 'Netral', title: 'Ethereum upgrade terbaru mulai diuji di testnet', source: 'CoinGecko', time: '22m lalu', coinColor: 'bg-blue-100 text-blue-800', sentColor: 'bg-gray-100 text-gray-600' },
    { coin: 'Market', sentiment: 'Bearish', title: 'Regulator AS perketat aturan exchange crypto', source: 'Reuters', time: '1j lalu', coinColor: 'bg-gray-100 text-gray-600', sentColor: 'bg-red-100 text-red-700' },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Halo, Selamat datang</h1>
          <p className="text-sm text-gray-500">Pasar crypto hari ini</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-10">Memuat data...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Fear & Greed</p>
              <p className={`text-2xl font-medium ${fgColor(fearGreed?.value)}`}>
                {fearGreed?.value ?? '—'}
              </p>
              <p className={`text-xs mt-1 ${fgColor(fearGreed?.value)}`}>
                {fearGreed ? fgLabel(Number(fearGreed.value)) : '—'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">BTC Dominance</p>
              <p className="text-2xl font-medium text-gray-900">
                {global ? `${global.market_cap_percentage.btc.toFixed(1)}%` : '—'}
              </p>
              <p className="text-xs text-gray-400 mt-1">dari total pasar</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Market Cap</p>
              <p className="text-2xl font-medium text-gray-900">
                {global ? formatCap(global.total_market_cap.usd) : '—'}
              </p>
              <p className={`text-xs mt-1 ${global?.market_cap_change_percentage_24h_usd >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {global ? `${global.market_cap_change_percentage_24h_usd.toFixed(1)}% 24j` : '—'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Volume 24j</p>
              <p className="text-2xl font-medium text-gray-900">
                {global ? formatCap(global.total_volume.usd) : '—'}
              </p>
              <p className="text-xs text-gray-400 mt-1">total pasar</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-5">
            <p className="text-sm text-gray-500 mb-3">Sentimen pasar</p>
            {[
              { label: 'Bullish', pct: 72, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
              { label: 'Netral', pct: 15, color: 'bg-gray-400', textColor: 'text-gray-500' },
              { label: 'Bearish', pct: 13, color: 'bg-red-400', textColor: 'text-red-500' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-700 w-14">{s.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className={`${s.color} h-1.5 rounded-full`} style={{ width: `${s.pct}%` }}></div>
                </div>
                <span className={`text-sm font-medium w-9 text-right ${s.textColor}`}>{s.pct}%</span>
              </div>
            ))}
          </div>

          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Berita Terkini</p>
          {news.map((n, i) => (
            <div key={i} className="bg-white rounded-xl p-4 mb-3">
              <div className="flex gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${n.coinColor}`}>{n.coin}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${n.sentColor}`}>{n.sentiment}</span>
              </div>
              <p className="text-sm font-medium text-gray-800 leading-snug mb-1">{n.title}</p>
              <p className="text-xs text-gray-400">{n.source} · {n.time}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
