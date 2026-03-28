'use client'
import { useEffect, useState } from 'react'

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'tron', symbol: 'TRX', name: 'Tron' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
]

export default function Pasar() {
  const [prices, setPrices] = useState({})
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      const [priceRes, infoRes] = await Promise.all([
        fetch('/api/allprices'),
        fetch('/api/coininfo?ids=' + COINS.map(c => c.id).join(','))
      ])
      const priceData = await priceRes.json()
      const infoData = await infoRes.json()
      if (priceData && Object.keys(priceData).length > 0) setPrices(priceData)
      if (infoData) setImages(infoData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 120000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price) => {
    if (price >= 1000) return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 })
    if (price >= 1) return '$' + price.toFixed(2)
    if (price >= 0.01) return '$' + price.toFixed(4)
    return '$' + price.toFixed(8)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="p-4 pb-2">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Harga pasar</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Real-time · CoinGecko</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-10">Memuat harga...</div>
      ) : (
        <div className="px-4">
          {COINS.map((coin, i) => {
            const data = prices[coin.id]
            const change = data?.usd_24h_change
            const isUp = change >= 0
            const imgUrl = images[coin.id]
            return (
              <div key={coin.id} className={'flex items-center gap-3 py-4 ' + (i < COINS.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : '')}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  {imgUrl ? (
                    <img src={imgUrl} alt={coin.name} width={40} height={40} />
                  ) : (
                    <span className="text-xs font-medium text-gray-500">{coin.symbol}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{coin.name}</p>
                  <p className="text-xs text-gray-400">{coin.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {data ? formatPrice(data.usd) : '—'}
                  </p>
                  <p className={'text-xs font-medium ' + (isUp ? 'text-emerald-600' : 'text-red-500')}>
                    {change ? (isUp ? '+' : '') + change.toFixed(1) + '%' : '—'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
