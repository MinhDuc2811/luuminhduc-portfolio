'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

// split so plain-HTML scrapers can't harvest a literal email/phone string
const EMAIL_PARTS = ['luuminhduc2811', 'gmail.com']
const PHONE_PARTS = ['0395', '947', '096']

function useReveal() {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return ready
}

export default function Contact() {
  const ready = useReveal()
  const email = EMAIL_PARTS.join('@')
  const phoneDisplay = PHONE_PARTS.join(' ')
  const phoneHref = '+84' + PHONE_PARTS.join('').slice(1)

  const CONTACT_LINES = [
    { key: 'email', value: ready ? email : 'loading…', href: ready ? `mailto:${email}` : undefined },
    { key: 'phone', value: ready ? phoneDisplay : 'loading…', href: ready ? `tel:${phoneHref}` : undefined },
    { key: 'location', value: 'Phu Tho, Vietnam' },
    {
      key: 'facebook',
      value: 'facebook.com/luu.minh.duc',
      href: 'https://www.facebook.com/profile.php?id=100013069661742',
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-bg-raised border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 font-mono text-sm text-fg-dim">
          <span className="text-teal">$</span> cat contact.md
        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-fg mb-4 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
          Let&apos;s build something together.
        </h2>
        <p className="text-fg-muted text-lg mb-10 max-w-2xl leading-relaxed">
          Open to fullstack roles and freelance projects. Reach out and I&apos;ll get back to you fast.
        </p>

        <div className="rounded-lg border border-border bg-bg divide-y divide-border font-mono text-sm">
          {CONTACT_LINES.map((line) => (
            <div key={line.key} className="flex items-center justify-between px-5 py-4">
              <span className="text-fg-dim">{line.key}:</span>
              {line.href ? (
                <a
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('contact_link_click', { channel: line.key })}
                  className="text-fg hover:text-amber transition-colors"
                >
                  {line.value}
                </a>
              ) : (
                <span className="text-fg">{line.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => {
              trackEvent('contact_email_click', { location: 'contact_section' })
              if (ready) window.location.href = `mailto:${email}`
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
          >
            send an email →
          </button>
          <a
            href="/cv-luu-minh-duc.pdf"
            download
            onClick={() => trackEvent('cv_download', { location: 'contact_section' })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
          >
            ↓ download cv.pdf
          </a>
        </div>
      </div>
    </section>
  )
}
