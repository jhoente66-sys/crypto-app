'use client'
import { useEffect, useState } from 'react'

const COINS = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'ripple', symbol: 'XRP' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'dogecoin', symbol: 'DOGE' },
  { id: 'polkadot', symbol: 'DOT' },
  { id: 'tron', symbol: 'TRX' },
  { id: 'litecoin', symbol: 'LTC' },
  { id: 'shiba-inu', symbol: 'SHIB' },
  { id: 'uniswap', symbol: 'UNI' },
  { id: 'chainlink', symbol: 'LINK' },
  { id: 'avalanche-2', symbol: 'AVAX' },
]

const CURRENCIES = [
  { id: 'usd', label: 'USD' },
  { id: 'idr', label: 'IDR' },
]

export default function Konversi() {
  const [prices, setPrices] = useState({})
  const [fromCoin, setFromCoin] = useState('bitcoin')
  const [toCurrency, setToCurrency] = useState('usd')
  const [amount, setAmount] = useState('1')
  const [loading, setLoading] = useState(true)

  async function fetchPrices() {
    try {
      const res = await fetch('/api/allprices')
      const data = await res.json()
      if (data && Object.keys(data).length > 0) setPrices(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 120000)
    return () => clearInterval(interval)
  }, [])

  const getResult = () => {
    const price = prices?.[fromCoin]?.[toCurrency]
    if (!price || amount === '' || isNaN(Number(amount))) return '—'
    const result = Number(amount) * price
    if (toCurrency === 'idr') return 'Rp ' + result.toLocaleString('id-ID', { maximumFractionDigits: 0 })
    if (result >= 1000) return '$' + result.toLocaleString('en-US', { maximumFractionDigits: 0 })
    if (result >= 1) return '$' + result.toFixed(2)
    if (result >= 0.0001) return '$' + result.toFixed(4)
    return '$' + result.toFixed(8)
  }

  const getRate = () => {
    const price = prices?.[fromCoin]?.[toCurrency]
    if (!price) return '—'
    const coin = COINS.find(c => c.id === fromCoin)
    if (toCurrency === 'idr') return '1 ' + coin.symbol + ' = Rp ' + price.toLocaleString('id-ID', { maximumFractionDigits: 0 })
    if (price >= 1000) return '1 ' + coin.symbol + ' = $' + price.toLocaleString('en-US', { maximumFractionDigits: 0 })
    return '1 ' + coin.symbol + ' = $' + price.toFixed(4)
  }

  const allCoinsInBTC = () => {
    const btcUsd = prices?.['bitcoin']?.usd
    if (!btcUsd) return []
    return [
      { label: 'USD', value: '$' + btcUsd.toLocaleString('en-US', { maximumFractionDigits: 0 }) },
      { label: 'IDR', value: prices['bitcoin']?.idr ? 'Rp ' + prices['bitcoin'].idr.toLocaleString('id-ID', { maximumFractionDigits: 0 }) : '—' },
      { label: 'ETH', value: prices['ethereum']?.usd ? (btcUsd / prices['ethereum'].usd).toFixed(2) : '—' },
      { label: 'SOL', value: prices['solana']?.usd ? (btcUsd / prices['solana'].usd).toFixed(1) : '—' },
      { label: 'BNB', value: prices['binancecoin']?.usd ? (btcUsd / prices['binancecoin'].usd).toFixed(1) : '—' },
      { label: 'XRP', value: prices['ripple']?.usd ? Math.round(btcUsd / prices['ripple'].usd).toLocaleString() : '—' },
    ]
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-950" style={{minHeight: '100dvh', paddingBottom: '100px'}}>
      <div className="mb-5">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Konversi</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tukar antar koin & mata uang</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-10">Memuat kurs...</div>
      ) : (
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-3 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Dari</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setAmount(val)
                  }
                }}
                placeholder="0"
                className="text-3xl font-medium text-gray-900 dark:text-white flex-1 outline-none bg-transparent w-full"
              />
              <select
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-200"
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
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400"
            >
              ⇅
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-5 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Ke</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-medium text-gray-900 dark:text-white flex-1">{getResult()}</p>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {CURRENCIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">{getRate()}</p>
          </div>

          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Semua Koin (1 BTC =)</p>
          <div className="grid grid-cols-2 gap-3">
            {allCoinsInBTC().map((item) => (
              <div key={item.label} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-500">{item.label}</p>
                <p className="text-base font-medium text-gray-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
