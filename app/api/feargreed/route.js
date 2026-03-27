export async function GET() {
  const res = await fetch('https://api.alternative.me/fng/')
  const data = await res.json()
  return Response.json(data)
}
