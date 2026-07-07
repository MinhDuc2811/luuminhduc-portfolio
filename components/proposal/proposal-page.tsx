'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ProposalHeader from './proposal-header'
import HeroScene from '@/components/hero-scene'
import { proposalContent, type Locale } from '@/lib/proposal-content'
import { trackEvent } from '@/lib/analytics'
import { PROJECTS } from '@/lib/work-data'

const EMAIL_PARTS = ['luuminhduc2811', 'gmail.com']
const PHONE_PARTS = ['0395', '947', '096']
const SLIDE_COUNT = 8 // hero + s1..s7

export default function ProposalPage() {
  const [locale, setLocale] = useState<Locale>('en')
  const [ready, setReady] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const searchParams = useSearchParams()
  const to = searchParams.get('to')
  const wheelLockRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)

  useEffect(() => setReady(true), [])

  const t = proposalContent[locale]
  const email = EMAIL_PARTS.join('@')
  const phoneDisplay = PHONE_PARTS.join(' ')
  const phoneHref = '+84' + PHONE_PARTS.join('').slice(1)

  function changeLocale(l: Locale) {
    setLocale(l)
    trackEvent('proposal_locale_change', { locale: l })
  }

  async function downloadCv(location: string) {
    trackEvent('cv_download', { location })
    const res = await fetch('/api/cv-link')
    if (!res.ok) return
    const { url } = await res.json()
    const a = document.createElement('a')
    a.href = url
    a.download = 'cv-luu-minh-duc.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const goTo = useCallback((index: number) => {
    setActiveSlide(Math.min(SLIDE_COUNT - 1, Math.max(0, index)))
  }, [])

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (wheelLockRef.current) return
      if (Math.abs(e.deltaY) < 10) return
      wheelLockRef.current = true
      setActiveSlide((prev) => {
        const next = e.deltaY > 0 ? prev + 1 : prev - 1
        return Math.min(SLIDE_COUNT - 1, Math.max(0, next))
      })
      setTimeout(() => {
        wheelLockRef.current = false
      }, 700)
    }
    function onTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0].clientY
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStartYRef.current === null || wheelLockRef.current) return
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY
      touchStartYRef.current = null
      if (Math.abs(deltaY) < 50) return
      wheelLockRef.current = true
      setActiveSlide((prev) => {
        const next = deltaY > 0 ? prev + 1 : prev - 1
        return Math.min(SLIDE_COUNT - 1, Math.max(0, next))
      })
      setTimeout(() => {
        wheelLockRef.current = false
      }, 700)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'ArrowDown' && e.key !== 'PageDown' && e.key !== 'ArrowUp' && e.key !== 'PageUp') return
      e.preventDefault()
      if (wheelLockRef.current) return
      wheelLockRef.current = true
      const delta = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1
      setActiveSlide((prev) => Math.min(SLIDE_COUNT - 1, Math.max(0, prev + delta)))
      setTimeout(() => {
        wheelLockRef.current = false
      }, 700)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div id="top" className="h-screen overflow-hidden text-fg">
      <HeroScene progress={activeSlide / (SLIDE_COUNT - 1)} />
      <ProposalHeader
        locale={locale}
        onLocaleChange={changeLocale}
        navLabel={t.nav.home}
        navTitles={[t.s1.title, t.s6.title, t.s2.title, t.s3.title, t.s4.title, t.s5.title, t.s7.title]}
        activeSlide={activeSlide}
        onNavigate={goTo}
      />

      {/* Hero */}
      <Slide active={activeSlide === 0}>
        <section className="relative h-full px-6 flex items-center hero-glow overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto w-full">
            <p className="font-mono text-sm text-teal mb-3 legible-on-photo">{t.hero.cmd}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg leading-[1.1] legible-on-photo" style={{ fontFamily: 'var(--font-display)' }}>
              {t.hero.title1}
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-amber leading-[1.1] mb-4 legible-on-photo" style={{ fontFamily: 'var(--font-display)' }}>
              {t.hero.title2}
            </h1>
            <p className="text-white text-base max-w-2xl leading-relaxed mb-5 legible-on-photo">{t.hero.subtitle}</p>

            <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-xs text-fg-dim">
              <span>★ <span className="text-amber">4.9–5.0</span> · 3,000+ merchant reviews</span>
              <span className="text-border">|</span>
              <span>2 Shopify apps <span className="text-teal">live</span> on the App Store</span>
              <span className="text-border">|</span>
              <span>2 full-stack products shipped to production</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <Field label={t.hero.fields.name} value={t.hero.fields.nameValue} />
              <Field label={t.hero.fields.role} value={t.hero.fields.roleValue} />
              <Field label={t.hero.fields.experience} value={t.hero.fields.experienceValue} />
              <Field label={t.hero.fields.to} value={to || t.hero.fields.toDefault} highlight={!!to} />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('proposal_cta_click', { target: 'contact' })
                  goTo(7)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
              >
                {t.hero.ctaContact}
              </button>
              <button
                type="button"
                onClick={() => downloadCv('proposal_hero')}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-fg font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
              >
                {t.hero.ctaCv}
              </button>
            </div>
          </div>
        </section>
      </Slide>

      {/* 01 — Intro */}
      <Slide active={activeSlide === 1}>
        <Section num={t.s1.num} cmd={t.s1.cmd} title={t.s1.title}>
          <div className="grid md:grid-cols-[160px_1fr] gap-6 items-start">
            <div className="relative rounded-xl border border-border overflow-hidden bg-bg-raised mx-auto md:mx-0 w-32 md:w-full">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border bg-bg">
                <span className="w-1.5 h-1.5 rounded-full bg-fg-dim/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-fg-dim/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-fg-dim/40" />
                <span className="ml-1.5 font-mono text-[9px] text-fg-dim">portrait.jpg</span>
              </div>
              <Image src="/luu-minh-duc.jpg" alt={t.s1.name} width={440} height={550} className="w-full h-auto object-cover" />
            </div>

            <div className="rounded-lg border border-border bg-bg p-4 space-y-2">
              <div>
                <h3 className="text-xl font-bold text-fg" style={{ fontFamily: 'var(--font-display)' }}>{t.s1.name}</h3>
                <p className="font-mono text-xs text-teal">{t.s1.tagline}</p>
              </div>
              <p className="text-fg-muted text-sm leading-snug">{t.s1.bio1}</p>
              <p className="text-fg-muted text-sm leading-snug">{t.s1.bio2}</p>
              <div className="flex flex-wrap gap-1.5">
                {t.s1.traits.map((tr) => (
                  <span key={tr} className="px-2 py-1 text-[11px] font-mono text-fg-muted bg-bg-raised border border-border rounded-md">{tr}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {t.s1.skillGroups.map((g) => (
              <div key={g.key}>
                <p className="font-mono text-xs text-fg-dim mb-1.5">
                  <span className="text-amber">&quot;{g.key}&quot;</span>:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[11px] font-mono text-fg bg-bg-raised border border-border rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Slide>

      {/* 02 — Case studies */}
      <Slide active={activeSlide === 2}>
        <Section num={t.s6.num} cmd={t.s6.cmd} title={t.s6.title} alt>
          <div className="rounded-lg border border-border bg-bg overflow-hidden mb-3">
            <div className="px-4 py-2.5 border-b border-border flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-sm text-fg">{t.s6.shopify.title}</p>
              <span className="font-mono text-xs text-fg-dim">{t.s6.shopify.year}</span>
            </div>
            <div className="p-4 space-y-1.5">
              <p className="font-mono text-xs text-teal">{t.s6.shopify.role}</p>
              <ul className="space-y-2">
                {t.s6.shopify.highlights.map((h) => (
                  <li key={h.label} className="flex items-start gap-2">
                    <span className="text-amber shrink-0 leading-snug">▸</span>
                    <p className="text-fg-muted text-sm leading-snug">
                      <span className="text-fg font-medium">{h.label}:</span> {h.body}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                <a href="https://apps.shopify.com/product-options-by-bss" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('shopify_app_click', { app: 'OPTIS Product Options', location: 'proposal' })} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-bg-raised hover:border-teal transition-colors">
                  <Image src="/apps/optis-options-icon.png" alt="" width={16} height={16} className="rounded shrink-0" />
                  <span className="font-mono text-[11px] text-fg">OPTIS Product Options, Variant</span>
                  <span className="font-mono text-[11px] text-amber">★ 4.9 (2,218)</span>
                </a>
                <a href="https://apps.shopify.com/optis-color-swatch-variants" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('shopify_app_click', { app: 'OP Color Swatch', location: 'proposal' })} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-bg-raised hover:border-teal transition-colors">
                  <Image src="/apps/optis-swatch-icon.png" alt="" width={16} height={16} className="rounded shrink-0" />
                  <span className="font-mono text-[11px] text-fg">OP Color Swatch Variant Images</span>
                  <span className="font-mono text-[11px] text-amber">★ 5.0 (810)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {t.s6.projects.map((p, i) => (
              <div key={p.name} className="group rounded-lg border border-border bg-bg overflow-hidden transition-colors hover:border-teal/50">
                <div className="flex gap-3 p-3">
                  <div className="relative w-24 aspect-video shrink-0 bg-bg-raised border border-border rounded overflow-hidden">
                    <Image
                      src={i === 0 ? '/projects/retrotrade.png' : '/projects/nutigo.png'}
                      alt={`${p.name} preview`}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="96px"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-bold text-fg text-sm" style={{ fontFamily: 'var(--font-display)' }}>{p.name}</p>
                      <span className="font-mono text-[10px] text-fg-dim shrink-0">{p.period}</span>
                    </div>
                    <p className="font-mono text-[11px] text-teal">{p.role}</p>
                    <p className="text-fg-muted text-xs leading-snug line-clamp-2">{p.body}</p>
                  </div>
                </div>
                <div className="px-3 pb-3 space-y-1.5">
                  <div className="flex flex-wrap gap-1">
                    {p.stack.map((s) => <span key={s} className="px-1.5 py-0.5 text-[10px] font-mono text-fg-muted bg-bg-raised border border-border rounded">{s}</span>)}
                  </div>
                  <div className="flex gap-3 font-mono text-xs">
                    <a
                      href={PROJECTS[i].links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_link_click', { project: p.name, type: 'live', location: 'proposal' })}
                      className="text-fg hover:text-amber transition-colors"
                    >
                      [live]
                    </a>
                    <a
                      href={PROJECTS[i].links[1].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_link_click', { project: p.name, type: 'github', location: 'proposal' })}
                      className="text-fg hover:text-amber transition-colors"
                    >
                      [github]
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Slide>

      {/* 03 — Context */}
      <Slide active={activeSlide === 3}>
        <Section num={t.s2.num} cmd={t.s2.cmd} title={t.s2.title}>
          <p className="text-white text-sm leading-snug max-w-2xl mb-4 legible-on-photo">{t.s2.intro}</p>
          <div className="grid md:grid-cols-3 gap-3">
            {t.s2.items.map((item) => (
              <div key={item.num} className="rounded-lg border border-border bg-bg p-4 transition-colors hover:border-amber/50">
                <p className="font-mono text-xs text-amber mb-1.5">{item.num} · {item.title}</p>
                <p className="text-fg-muted text-sm leading-snug">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Slide>

      {/* 04 — Solution */}
      <Slide active={activeSlide === 4}>
        <Section num={t.s3.num} cmd={t.s3.cmd} title={t.s3.title} alt>
          <p className="text-white text-sm leading-snug max-w-2xl mb-4 legible-on-photo">{t.s3.intro}</p>
          <div className="grid md:grid-cols-3 gap-3">
            {t.s3.items.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-bg-raised p-4 transition-colors hover:border-teal/50">
                <p className="font-mono text-xs text-teal mb-1.5">{item.tag}</p>
                <p className="font-bold text-fg text-sm mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</p>
                <p className="text-fg-muted text-sm leading-snug">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Slide>

      {/* 05 — Scope */}
      <Slide active={activeSlide === 5}>
        <Section num={t.s4.num} cmd={t.s4.cmd} title={t.s4.title}>
          <div className="rounded-lg border border-border bg-bg divide-y divide-border">
            {t.s4.rows.map((row) => (
              <div key={row.label} className="grid sm:grid-cols-[140px_1fr] gap-1.5 sm:gap-4 px-4 py-2.5 transition-colors hover:bg-bg-raised/60">
                <p className="font-mono text-xs text-teal shrink-0">{row.label}</p>
                <p className="text-fg-muted text-sm leading-snug">{row.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Slide>

      {/* 06 — Roadmap */}
      <Slide active={activeSlide === 6}>
        <Section num={t.s5.num} cmd={t.s5.cmd} title={t.s5.title} alt>
          <div className="space-y-3">
            {t.s5.items.map((item) => (
              <div key={item.range} className="rounded-lg border border-border bg-bg p-4 pl-6 relative transition-colors hover:border-amber/50">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="absolute left-[13px] top-5 w-2 h-2 rounded-full bg-amber" />
                <p className="font-mono text-xs text-teal mb-1">{item.range}</p>
                <p className="font-bold text-fg text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</p>
                <p className="text-fg-muted text-sm leading-snug">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Slide>

      {/* 07 — Terms & contact */}
      <Slide active={activeSlide === 7}>
        <Section num={t.s7.num} cmd={t.s7.cmd} title={t.s7.title}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-mono text-xs text-fg-dim mb-2">{t.s7.termsCmd}</p>
              <div className="rounded-lg border border-border bg-bg-raised divide-y divide-border font-mono text-sm">
                <TermRow label={t.s7.terms.type} value={t.s7.terms.typeValue} />
                <TermRow label={t.s7.terms.start} value={t.s7.terms.startValue} />
                <TermRow label={t.s7.terms.location} value={t.s7.terms.locationValue} />
                <TermRow label={t.s7.terms.probation} value={t.s7.terms.probationValue} />
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-fg-dim mb-2">{t.s7.contactCmd}</p>
              <div className="rounded-lg border border-border bg-bg-raised divide-y divide-border font-mono text-sm">
                <TermRow label="email" value={ready ? email : '···'} href={ready ? `mailto:${email}` : undefined} copyValue={ready ? email : undefined} />
                <TermRow label="phone" value={ready ? phoneDisplay : '···'} href={ready ? `tel:${phoneHref}` : undefined} copyValue={ready ? phoneDisplay : undefined} />
                <TermRow label="location" value="Phú Thọ, Việt Nam" />
                <TermRow label="facebook" value="facebook.com/luu.minh.duc" href="https://www.facebook.com/profile.php?id=100013069661742" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-4">
            {t.s7.steps.map((step) => (
              <div key={step.label} className="rounded-lg border border-border bg-bg p-3 transition-colors hover:border-amber/50">
                <p className="font-mono text-xs text-amber mb-1">{step.label}</p>
                <p className="font-bold text-fg text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</p>
                <p className="text-fg-muted text-xs leading-snug">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('contact_email_click', { location: 'proposal' })
                if (ready) window.location.href = `mailto:${email}`
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
            >
              {t.s7.ctaEmail}
            </button>
            <button
              type="button"
              onClick={() => downloadCv('proposal_footer')}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-fg font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
            >
              {t.s7.ctaCv}
            </button>
          </div>
          <p className="font-mono text-[11px] text-fg-dim mt-4 legible-on-photo">{t.footer}</p>
        </Section>
      </Slide>
    </div>
  )
}

function Slide({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 top-0 transition-opacity duration-500 ${active ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
      aria-hidden={!active}
    >
      <div className="h-screen pt-14 overflow-y-auto">{children}</div>
    </div>
  )
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-bg-raised px-3 py-2">
      <p className="font-mono text-[9px] text-fg-dim uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`font-mono text-sm font-medium ${highlight ? 'text-amber' : 'text-fg'}`}>{value}</p>
    </div>
  )
}

function TermRow({ label, value, href, copyValue }: { label: string; value: string; href?: string; copyValue?: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (!copyValue) return
    navigator.clipboard.writeText(copyValue)
    trackEvent('contact_copy', { field: label })
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between px-3 py-2 gap-3">
      <span className="text-fg-dim shrink-0">{label}:</span>
      <span className="flex items-center gap-2 min-w-0">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-amber transition-colors truncate">{value}</a>
        ) : (
          <span className="text-fg truncate">{value}</span>
        )}
        {copyValue && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
            className="shrink-0 text-fg-dim hover:text-teal transition-colors"
          >
            {copied ? (
              <span className="text-teal text-xs">✓</span>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}
      </span>
    </div>
  )
}

function Section({
  num,
  cmd,
  title,
  children,
}: {
  num: string
  cmd: string
  title: string
  alt?: boolean
  children: React.ReactNode
}) {
  return (
    <section className="min-h-full px-6 py-6 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <p className="font-mono text-xs text-fg-dim mb-1.5 legible-on-photo">
          <span className="text-amber">{num}</span> <span className="text-teal">{cmd}</span>
        </p>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-fg mb-4 legible-on-photo" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
