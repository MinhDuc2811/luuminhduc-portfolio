import { readFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { verifyCvToken } from '@/lib/cv-token'

const CV_PATH = path.join(process.cwd(), 'private-assets', 'cv-luu-minh-duc.pdf')

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ok = verifyCvToken(searchParams.get('expiry'), searchParams.get('sig'))
  if (!ok) {
    return NextResponse.json({ error: 'Link expired or invalid' }, { status: 403 })
  }

  const file = await readFile(CV_PATH)
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="cv-luu-minh-duc.pdf"',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
