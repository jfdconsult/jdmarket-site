import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Called by the GitHub Actions pipeline after uploading new data
export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() })
}
