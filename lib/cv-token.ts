import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

export const CV_COOKIE = 'cv-session'
export const CV_TTL_SECONDS = 300

export function cvConfigured(): boolean {
  return Boolean(process.env.CV_LINK_SECRET && process.env.CV_LINK_SECRET.length >= 32 &&
    process.env.CV_ACCESS_PASSWORD && process.env.CV_ACCESS_PASSWORD.length >= 16 &&
    /^[a-f\d]{64}$/i.test(process.env.CV_ENCRYPTION_KEY || ''))
}

export function passwordMatches(password: string): boolean {
  if (!cvConfigured()) return false
  const hash = (value: string) => createHash('sha256').update(value).digest()
  return timingSafeEqual(hash(password), hash(process.env.CV_ACCESS_PASSWORD!))
}

function sign(payload: string): string {
  return createHmac('sha256', process.env.CV_LINK_SECRET!).update(`cv:v1:${payload}`).digest('hex')
}

export function createCvToken(now = Date.now()): string {
  if (!cvConfigured()) throw new Error('CV access is not configured')
  const payload = `${now + CV_TTL_SECONDS * 1000}.${randomBytes(16).toString('hex')}`
  return `${payload}.${sign(payload)}`
}

export function verifyCvToken(token: string | undefined, now = Date.now()): boolean {
  if (!cvConfigured() || !token) return false
  const match = /^(\d{13})\.([a-f\d]{32})\.([a-f\d]{64})$/.exec(token)
  if (!match) return false
  const expiry = Number(match[1])
  if (expiry <= now || expiry > now + CV_TTL_SECONDS * 1000) return false
  return timingSafeEqual(Buffer.from(match[3], 'hex'), Buffer.from(sign(`${match[1]}.${match[2]}`), 'hex'))
}
