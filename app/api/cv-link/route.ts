import { NextResponse } from 'next/server'
import { createCvToken } from '@/lib/cv-token'

export async function GET() {
  const { expiry, sig } = createCvToken()
  return NextResponse.json(
    { url: `/api/cv?expiry=${expiry}&sig=${sig}` },
    { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } }
  )
}
