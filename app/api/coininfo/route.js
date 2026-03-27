let cache = null
let lastFetch = 0

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')

  const now = Date.now()
  if (cache && now - lastFetch < 3600000) {
    return Response.json(cache)
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc`
    )
    const data = await res.json()
    const images = {}
    data.forEach(coin => {
      images[coin.id] = coin.image
    })
    cache = images
    lastFetch = now
    return Response.json(images)
  } catch (e) {
    return Response.json(cache ?? {})
  }
}
