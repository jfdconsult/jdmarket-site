import { NextResponse } from 'next/server'

// Proxy pro jd-news-api (notícias já curadas e traduzidas).
// Evita CORS e concentra cache-control em um só lugar.
export const revalidate = 300 // 5 min

export async function GET() {
  try {
    const r = await fetch('https://jd-news-api.fly.dev/api/latest_news', {
      next: { revalidate: 300 },
    })
    if (!r.ok) {
      return NextResponse.json({ articles: [], timestamp: null, error: `upstream ${r.status}` }, { status: 200 })
    }
    const d = await r.json()
    return NextResponse.json(
      { articles: d.articles ?? [], timestamp: d.timestamp ?? null },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    )
  } catch (e) {
    return NextResponse.json({ articles: [], timestamp: null, error: String(e) }, { status: 200 })
  }
}
