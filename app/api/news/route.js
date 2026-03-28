let cache = null
let lastFetch = 0

export async function GET() {
  const now = Date.now()

  if (cache && now - lastFetch < 300000) {
    return Response.json(cache)
  }

  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/news?page=1',
      { cache: 'no-store' }
    )
    const data = await res.json()
    if (data?.data && data.data.length > 0) {
      cache = data.data.slice(0, 10)
      lastFetch = now
    }
    return Response.json(cache ?? [])
  } catch (e) {
    return Response.json(cache ?? [])
  }
}
