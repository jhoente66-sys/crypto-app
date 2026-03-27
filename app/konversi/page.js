'use client'
import { useEffect, useState } from 'react'

const COINS = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'ripple', symbol: 'XRP' },
]

export default function Konversi() {
  const [prices, setPrices] = useState({})
  const [fromCoin, setFromCoin] = useState('bitcoin')
  const [toCurrency, setToCurrency] = useState('usd')
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(true)

  async function fetchPrices() {
    try {
      const ids = COINS.map(c => c.id).join(',')
      const res = await fetch('/api/allprices')
      const data = await res.json()
      if (data && Object.keys(data).length > 0) {
        setPrices(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  const getResult = () => {
    if (!prices[fromCoin] || !prices[fromCoin][toCurrency]) return '—'
    const price = prices[fromCoin][toCurrency]
    const result = amount * price
    if (toCurrency === 'idr') {
      return `Rp ${result.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
    }
    if (result >= 1000) return `$${result.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    if (result >= 1) return `$${result.toFixed(2)}`
    return `$${result.toFixed(4)}`
  }

  const getRate = () => {
    if (!prices[fromCoin] || !prices[fromCoin][toCurrency]) return '—'
    const coin = COINS.find(c => c.id === fromCoin)
    const price = prices[fromCoin][toCurrency]
    if (toCurrency === 'idr') {
      return `1 ${coin.symbol} = Rp ${price.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
    }
    return `1 ${coin.symbol} = $${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  }

  const allCoinsInBTC = () => {
    if (!prices['bitcoin']) return []
    const btcUsd = prices['bitcoin'].usd
    return [
      { label: 'USD', value: `$${btcUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
      { label: 'IDR', value: prices['bitcoin']?.idr ? `Rp ${(prices['bitcoin'].idr).toLocaleString('id-ID', { maximumFractionDigits: 0 })}` : '—' },
      { label: 'ETH', value: prices['ethereum'] ? (btcUsd / prices['ethereum'].usd).toFixed(2) : '—' },
      { label: 'SOL', value: prices['solana'] ? (btcUsd / prices['solana'].usd).toFixed(1) : '—' },
      { label: 'BNB', value: prices['binancecoin'] ? (btcUsd / prices['binancecoin'].usd).toFixed(1) : '—' },
      { label: 'XRP', value: prices['ripple'] ? Math.round(btcUsd / prices['ripple'].usd).toLocaleString() : '—' },
    ]
  }

  return (
    <div className="p-4">
      <div className="mb-5">
        <h1 className="text-2xl font-medium text-gray-900">Konversi</h1>
        <p className="text-sm text-gray-500">Tukar antar koin & mata uang</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-10">Memuat kurs...</div>
      ) : (
        <>
          <div className="bg-gray-100 rounded-xl p-4 mb-3">
            <p className="text-xs text-gray-500 mb-2">Dari</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                className="text-3xl font-medium text-gray-900 flex-1 outline-none w-full bg-transparent"
              />
              <select
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800"
              >
                {COINS.map(c => (
                  <option key={c.id} value={c.id}>{c.symbol}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mb-3">
            <button
              onClick={() => setToCurrency(toCurrency === 'usd' ? 'idr' : 'usd')}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500"
            >
              ⇅
            </button>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 mb-5">
            <p className="text-xs text-gray-500 mb-2">Ke</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-medium text-gray-900 flex-1">{getResult()}</p>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800"
              >
                <option value="usd">USD</option>
                <option value="idr">IDR</option>
              </select>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">{getRate()}</p>
          </div>

          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Semua Koin (1 BTC =)</p>
          <div className="grid grid-cols-2 gap-4">
            {allCoinsInBTC().map((item) => (
              <div key={item.label} className="bg-gray-100 rounded-xl p-3">
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-base font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
