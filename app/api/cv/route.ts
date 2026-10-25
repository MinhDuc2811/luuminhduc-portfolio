import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextRequest, NextResponse } from 'next/server'
import { CV_COOKIE, verifyCvToken } from '@/lib/cv-token'
import { decryptCv } from '@/lib/cv-file'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  Vary: 'Cookie',
}

export async function GET(req: NextRequest) {
  if (!verifyCvToken(req.cookies.get(CV_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Access required or session expired' }, { status: 403, headers })
  }
  try {
    const encrypted = await readFile(path.join(process.cwd(), 'private-assets', 'cv-luu-minh-duc.pdf.enc'))
    const file = decryptCv(encrypted, process.env.CV_ENCRYPTION_KEY!)
    return new NextResponse(new Uint8Array(file), {
      headers: { ...headers, 'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cv-luu-minh-duc.pdf"' },
    })
  } catch {
    return NextResponse.json({ error: 'CV is temporarily unavailable' }, { status: 503, headers })
  }
}
