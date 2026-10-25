import { NextRequest, NextResponse } from 'next/server'
import { createCvToken, cvConfigured, CV_COOKIE, CV_TTL_SECONDS, passwordMatches } from '@/lib/cv-token'

export const runtime = 'nodejs'
const headers = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' }

export async function POST(req: NextRequest) {
  if (!cvConfigured()) return NextResponse.json({ error: 'CV access is not configured' }, { status: 503, headers })
  let sameOrigin = false
  try {
    // Next may construct req.url with the internal bind address behind a proxy.
    // Browsers supply Host for the public URL; require an exact origin host match.
    const origin = new URL(req.headers.get('origin') || '')
    sameOrigin = ['https:', 'http:'].includes(origin.protocol) && origin.host === req.headers.get('host')
  } catch { /* An absent or malformed Origin must fail closed. */ }
  const fetchSite = req.headers.get('sec-fetch-site')
  if (!sameOrigin || (fetchSite && fetchSite !== 'same-origin') ||
    !req.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 403, headers })
  }
  try {
    // Bound the streaming body; Content-Length can be absent or untrusted.
    const reader = req.body?.getReader()
    if (!reader) throw new Error('Missing body')
    const chunks: Uint8Array[] = []
    let length = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.length
      if (length > 2048) { await reader.cancel(); throw new Error('Body too large') }
      chunks.push(value)
    }
    const { password } = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (typeof password !== 'string' || !passwordMatches(password)) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401, headers })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers })
  }
  const response = NextResponse.json({ url: '/api/cv' }, { headers })
  response.cookies.set(CV_COOKIE, createCvToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict',
    path: '/api/cv', maxAge: CV_TTL_SECONDS,
  })
  return response
}
