'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ProposalHeader from './proposal-header'
// import PixelLandscape from '@/components/pixel-landscape' // temporarily disabled — revisit with a proper 3D model later
import { proposalContent, type Locale } from '@/lib/proposal-content'
import { trackEvent } from '@/lib/analytics'
import { PROJECTS } from '@/lib/work-data'

const EMAIL_PARTS = ['luuminhduc2811', 'gmail.com']
const PHONE_PARTS = ['0395', '947', '096']

export default function ProposalPage() {
  const [locale, setLocale] = useState<Locale>('en')
  const [ready, setReady] = useState(false)
  const searchParams = useSearchParams()
  const to = searchParams.get('to')

  useEffect(() => setReady(true), [])

  const t = proposalContent[locale]
  const email = EMAIL_PARTS.join('@')
  const phoneDisplay = PHONE_PARTS.join(' ')
  const phoneHref = '+84' + PHONE_PARTS.join('').slice(1)

  function changeLocale(l: Locale) {
    setLocale(l)
    trackEvent('proposal_locale_change', { locale: l })
  }

  return (
    <div id="top" className="min-h-screen text-fg">
      <ProposalHeader
        locale={locale}
        onLocaleChange={changeLocale}
        navLabel={t.nav.home}
        navTitles={[t.s1.title, t.s2.title, t.s3.title, t.s4.title, t.s5.title, t.s6.title, t.s7.title]}
      />

      {/* Hero */}
      <section className="relative px-6 pt-14 pb-0 hero-glow overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-up">
          <p className="font-mono text-sm text-teal mb-4">{t.hero.cmd}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-fg leading-[1.1] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {t.hero.title1}
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-amber leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            {t.hero.title2}
          </h1>
          <p className="text-fg-muted text-lg max-w-2xl leading-relaxed mb-6">{t.hero.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 mb-8 font-mono text-xs text-fg-dim">
            <span>★ <span className="text-amber">4.9–5.0</span> · 3,000+ merchant reviews</span>
            <span className="text-border">|</span>
            <span>2 Shopify apps <span className="text-teal">live</span> on the App Store</span>
            <span className="text-border">|</span>
            <span>2 full-stack products shipped to production</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Field label={t.hero.fields.name} value={t.hero.fields.nameValue} />
            <Field label={t.hero.fields.role} value={t.hero.fields.roleValue} />
            <Field label={t.hero.fields.experience} value={t.hero.fields.experienceValue} />
            <Field label={t.hero.fields.to} value={to || t.hero.fields.toDefault} highlight={!!to} />
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href="#s7"
              onClick={() => trackEvent('proposal_cta_click', { target: 'contact' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
            >
              {t.hero.ctaContact}
            </a>
            <a
              href="/cv-luu-minh-duc.pdf"
              download
              onClick={() => trackEvent('cv_download', { location: 'proposal_hero' })}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
            >
              {t.hero.ctaCv}
            </a>
          </div>
        </div>
      </section>

      {/* PixelLandscape temporarily disabled — revisit with a proper 3D model later */}
      {/* <PixelLandscape /> */}

      {/* 01 — Intro */}
      <Section num={t.s1.num} cmd={t.s1.cmd} title={t.s1.title}>
        <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">
          <div className="relative rounded-xl border border-border overflow-hidden bg-bg-raised mx-auto md:mx-0 w-44 md:w-full">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-bg">
              <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
              <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
              <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
              <span className="ml-2 font-mono text-[10px] text-fg-dim">portrait.jpg</span>
            </div>
            <Image src="/luu-minh-duc.jpg" alt={t.s1.name} width={440} height={550} className="w-full h-auto object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-fg" style={{ fontFamily: 'var(--font-display)' }}>{t.s1.name}</h3>
              <p className="font-mono text-sm text-teal">{t.s1.tagline}</p>
            </div>
            <p className="text-fg-muted leading-relaxed">{t.s1.bio1}</p>
            <p className="text-fg-muted leading-relaxed">{t.s1.bio2}</p>
            <div className="flex flex-wrap gap-2">
              {t.s1.traits.map((tr) => (
                <span key={tr} className="px-3 py-1.5 text-xs font-mono text-fg-muted bg-bg-raised border border-border rounded-md">{tr}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {t.s1.skillGroups.map((g) => (
            <div key={g.key}>
              <p className="font-mono text-sm text-fg-dim mb-2">
                <span className="text-amber">&quot;{g.key}&quot;</span>:
              </p>
              <div className="flex flex-wrap gap-2">
                {g.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-mono text-fg bg-bg-raised border border-border rounded-md">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 — Context */}
      <Section num={t.s2.num} cmd={t.s2.cmd} title={t.s2.title} alt>
        <p className="text-fg-muted leading-relaxed max-w-2xl mb-8">{t.s2.intro}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {t.s2.items.map((item) => (
            <div key={item.num} className="rounded-lg border border-border bg-bg p-5 transition-colors hover:border-amber/50">
              <p className="font-mono text-xs text-amber mb-2">{item.num} · {item.title}</p>
              <p className="text-fg-muted text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 — Solution */}
      <Section num={t.s3.num} cmd={t.s3.cmd} title={t.s3.title}>
        <p className="text-fg-muted leading-relaxed max-w-2xl mb-8">{t.s3.intro}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {t.s3.items.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-bg-raised p-5 transition-colors hover:border-teal/50">
              <p className="font-mono text-xs text-teal mb-2">{item.tag}</p>
              <p className="font-bold text-fg mb-2" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</p>
              <p className="text-fg-muted text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — Scope */}
      <Section num={t.s4.num} cmd={t.s4.cmd} title={t.s4.title} alt>
        <div className="rounded-lg border border-border bg-bg divide-y divide-border">
          {t.s4.rows.map((row) => (
            <div key={row.label} className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6 px-5 py-4 transition-colors hover:bg-bg-raised/60">
              <p className="font-mono text-sm text-teal shrink-0">{row.label}</p>
              <p className="text-fg-muted text-sm leading-relaxed">{row.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 — Roadmap */}
      <Section num={t.s5.num} cmd={t.s5.cmd} title={t.s5.title}>
        <div className="space-y-8">
          {t.s5.items.map((item) => (
            <div key={item.range} className="relative pl-8 border-l border-border">
              <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-amber" />
              <p className="font-mono text-xs text-teal mb-1">{item.range}</p>
              <p className="font-bold text-fg mb-2" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</p>
              <p className="text-fg-muted text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 06 — Case studies */}
      <Section num={t.s6.num} cmd={t.s6.cmd} title={t.s6.title} alt>
        <div className="rounded-lg border border-border bg-bg overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-sm text-fg">{t.s6.shopify.title}</p>
            <span className="font-mono text-xs text-fg-dim">{t.s6.shopify.year}</span>
          </div>
          <div className="p-5 space-y-3">
            <p className="font-mono text-xs text-teal">{t.s6.shopify.role}</p>
            <p className="text-fg-muted text-sm leading-relaxed">{t.s6.shopify.body}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://apps.shopify.com/product-options-by-bss" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('shopify_app_click', { app: 'OPTIS Product Options', location: 'proposal' })} className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-bg-raised hover:border-teal transition-colors">
                <Image src="/apps/optis-options-icon.png" alt="" width={20} height={20} className="rounded shrink-0" />
                <span className="font-mono text-xs text-fg">OPTIS Product Options, Variant</span>
                <span className="font-mono text-xs text-amber">★ 4.9 (2,218)</span>
              </a>
              <a href="https://apps.shopify.com/optis-color-swatch-variants" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('shopify_app_click', { app: 'OP Color Swatch', location: 'proposal' })} className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-bg-raised hover:border-teal transition-colors">
                <Image src="/apps/optis-swatch-icon.png" alt="" width={20} height={20} className="rounded shrink-0" />
                <span className="font-mono text-xs text-fg">OP Color Swatch Variant Images</span>
                <span className="font-mono text-xs text-amber">★ 5.0 (810)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.s6.projects.map((p, i) => (
            <div key={p.name} className="group rounded-lg border border-border bg-bg overflow-hidden transition-colors hover:border-teal/50">
              <div className="relative aspect-video bg-bg-raised border-b border-border overflow-hidden">
                <Image
                  src={i === 0 ? '/projects/retrotrade.png' : '/projects/nutigo.png'}
                  alt={`${p.name} preview`}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-bold text-fg" style={{ fontFamily: 'var(--font-display)' }}>{p.name}</p>
                  <span className="font-mono text-xs text-fg-dim">{p.period}</span>
                </div>
                <p className="font-mono text-xs text-teal">{p.role}</p>
                <p className="text-fg-muted text-sm leading-relaxed">{p.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <span key={s} className="px-2 py-0.5 text-[10px] font-mono text-fg-muted bg-bg-raised border border-border rounded">{s}</span>)}
                </div>
                <div className="flex gap-4 pt-1 font-mono text-sm">
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

      {/* 07 — Terms & contact */}
      <Section num={t.s7.num} cmd={t.s7.cmd} title={t.s7.title}>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <p className="font-mono text-xs text-fg-dim mb-3">{t.s7.termsCmd}</p>
            <div className="rounded-lg border border-border bg-bg-raised divide-y divide-border font-mono text-sm">
              <TermRow label={t.s7.terms.type} value={t.s7.terms.typeValue} />
              <TermRow label={t.s7.terms.start} value={t.s7.terms.startValue} />
              <TermRow label={t.s7.terms.location} value={t.s7.terms.locationValue} />
              <TermRow label={t.s7.terms.probation} value={t.s7.terms.probationValue} />
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-fg-dim mb-3">{t.s7.contactCmd}</p>
            <div className="rounded-lg border border-border bg-bg-raised divide-y divide-border font-mono text-sm">
              <TermRow label="email" value={ready ? email : '···'} href={ready ? `mailto:${email}` : undefined} copyValue={ready ? email : undefined} />
              <TermRow label="phone" value={ready ? phoneDisplay : '···'} href={ready ? `tel:${phoneHref}` : undefined} copyValue={ready ? phoneDisplay : undefined} />
              <TermRow label="location" value="Phú Thọ, Việt Nam" />
              <TermRow label="facebook" value="facebook.com/luu.minh.duc" href="https://www.facebook.com/profile.php?id=100013069661742" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {t.s7.steps.map((step) => (
            <div key={step.label} className="rounded-lg border border-border bg-bg p-5 transition-colors hover:border-amber/50">
              <p className="font-mono text-xs text-amber mb-2">{step.label}</p>
              <p className="font-bold text-fg mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</p>
              <p className="text-fg-muted text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => {
              trackEvent('contact_email_click', { location: 'proposal' })
              if (ready) window.location.href = `mailto:${email}`
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
          >
            {t.s7.ctaEmail}
          </button>
          <a
            href="/cv-luu-minh-duc.pdf"
            download
            onClick={() => trackEvent('cv_download', { location: 'proposal_footer' })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
          >
            {t.s7.ctaCv}
          </a>
        </div>
      </Section>

      <footer className="py-8 px-6 border-t border-border">
        <p className="max-w-4xl mx-auto font-mono text-xs text-fg-dim">{t.footer}</p>
      </footer>
    </div>
  )
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-bg-raised px-4 py-3">
      <p className="font-mono text-[10px] text-fg-dim uppercase tracking-wide mb-1">{label}</p>
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
    <div className="flex items-center justify-between px-4 py-3 gap-3">
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
  alt,
  children,
}: {
  num: string
  cmd: string
  title: string
  alt?: boolean
  children: React.ReactNode
}) {
  const sectionId = `s${num.replace(/^0/, '')}`
  return (
    <section id={sectionId} className={`py-14 md:py-20 px-6 border-t border-border animate-fade-up ${alt ? 'bg-bg-raised/70' : 'bg-bg/40'}`}>
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-sm text-fg-dim mb-2">
          <span className="text-amber">{num}</span> <span className="text-teal">{cmd}</span>
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mb-7" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
