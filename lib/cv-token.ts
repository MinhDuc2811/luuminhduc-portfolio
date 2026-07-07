import { createHmac, timingSafeEqual } from 'crypto'

// Falls back to a build-time constant if no env var is set — still keeps the
// PDF out of /public and off crawlers, which is the actual goal here.
const SECRET = process.env.CV_LINK_SECRET || 'luuminhduc-cv-link-secret-fallback'
const TTL_MS = 5 * 60 * 1000

function sign(expiry: number): string {
  return createHmac('sha256', SECRET).update(String(expiry)).digest('hex')
}

export function createCvToken(): { expiry: number; sig: string } {
  const expiry = Date.now() + TTL_MS
  return { expiry, sig: sign(expiry) }
}

export function verifyCvToken(expiryParam: string | null, sigParam: string | null): boolean {
  if (!expiryParam || !sigParam) return false
  const expiry = Number(expiryParam)
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false

  const expected = sign(expiry)
  const expectedBuf = Buffer.from(expected)
  const actualBuf = Buffer.from(sigParam)
  if (expectedBuf.length !== actualBuf.length) return false
  return timingSafeEqual(expectedBuf, actualBuf)
}
