let cache = null
let lastFetch = 0

const ALL_IDS = [
  'bitcoin','ethereum','solana','binancecoin','ripple',
  'cardano','dogecoin','polkadot','tron','litecoin',
  'shiba-inu','uniswap','chainlink','avalanche-2'
].join(',')

export async function GET() {
  const now = Date.now()

  if (cache && now - lastFetch < 300000) {
    return Response.json(cache)
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ALL_IDS}&vs_currencies=usd,idr&include_24hr_change=true`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    if (data && !data.status?.error_code) {
      cache = data
      lastFetch = now
      return Response.json(cache)
    }
    return Response.json(cache ?? {})
  } catch (e) {
    return Response.json(cache ?? {})
  }
}
