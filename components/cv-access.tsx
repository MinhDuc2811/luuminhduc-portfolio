'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Locale } from '@/lib/proposal-content'

export default function CvAccess({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const vi = locale === 'vi'
  useEffect(() => {
    const node = dialog.current
    node?.showModal()
    return () => { node?.close() }
  }, [])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/cv-link', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input.current?.value }),
      })
      if (input.current) input.current.value = ''
      if (!response.ok) {
        setError(response.status === 401 ? (vi ? 'Mã truy cập chưa đúng.' : 'That access code is incorrect.') :
          (vi ? 'CV hiện chưa sẵn sàng. Vui lòng liên hệ tôi qua email.' : 'CV is currently unavailable. Please contact me by email.'))
        return
      }
      // Download with the HttpOnly session; no bearer token is exposed in the URL.
      const pdf = await fetch('/api/cv', { cache: 'no-store' })
      if (!pdf.ok) throw new Error('Download failed')
      const url = URL.createObjectURL(await pdf.blob())
      const a = document.createElement('a')
      a.href = url
      a.download = 'cv-luu-minh-duc.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
      onClose()
    } catch {
      setError(vi ? 'Không thể tải CV. Vui lòng thử lại.' : 'Unable to download. Please try again.')
    } finally { setBusy(false) }
  }
  return <dialog ref={dialog} className="cv-dialog" aria-labelledby="cv-title" aria-describedby="cv-description" onCancel={onClose}>
    <button type="button" onClick={onClose} className="dialog-close" aria-label={vi ? 'Đóng' : 'Close'}>×</button>
    <p className="eyebrow">PRIVATE DOCUMENT / CV</p>
    <h2 id="cv-title">{vi ? 'Một lời giới thiệu riêng.' : 'A more personal introduction.'}</h2>
    <p id="cv-description">{vi ? 'Nhập mã tôi đã gửi cho bạn để tải CV. Chưa có mã? Hãy liên hệ qua email.' : 'Enter the access code I shared with you to download my CV. Need a code? Get in touch by email.'}</p>
    <form onSubmit={submit}>
      <label htmlFor="cv-password">{vi ? 'Mã truy cập' : 'Access code'}</label>
      <input ref={input} id="cv-password" type="password" required maxLength={256} autoComplete="off" autoFocus aria-describedby={error ? 'cv-error' : undefined} aria-invalid={Boolean(error)} />
      <p id="cv-error" role="status" className="cv-error">{error}</p>
      <button className="primary-button" disabled={busy}>{busy ? (vi ? 'Đang tải…' : 'Downloading…') : (vi ? 'Mở khóa & tải CV ↓' : 'Unlock & download ↓')}</button>
    </form>
    <a href="mailto:luuminhduc2811@gmail.com" className="cv-email">{vi ? 'Yêu cầu mã qua email ↗' : 'Request access by email ↗'}</a>
  </dialog>
}
