let cache = {}
let lastFetch = {}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')
  const vs = searchParams.get('vs_currencies') || 'usd'
  const cacheKey = `${ids}-${vs}`
  const now = Date.now()

  if (cache[cacheKey] && now - lastFetch[cacheKey] < 120000) {
    return Response.json(cache[cacheKey])
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vs}&include_24hr_change=true`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    if (data && !data.status?.error_code) {
      cache[cacheKey] = data
      lastFetch[cacheKey] = now
    }
    return Response.json(cache[cacheKey] ?? {})
  } catch (e) {
    return Response.json(cache[cacheKey] ?? {})
  }
}
