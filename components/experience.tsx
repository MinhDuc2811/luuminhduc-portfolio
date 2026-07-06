'use client'

import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

const BSS_APPS = [
  {
    name: 'OPTIS Product Options, Variant',
    role: 'variant/option UI + admin CMS',
    rating: '4.9',
    reviews: '2,218',
    icon: '/apps/optis-options-icon.png',
    href: 'https://apps.shopify.com/product-options-by-bss',
  },
  {
    name: 'OP Color Swatch Variant Images',
    role: 'storefront swatches + gallery',
    rating: '5.0',
    reviews: '810',
    icon: '/apps/optis-swatch-icon.png',
    href: 'https://apps.shopify.com/optis-color-swatch-variants',
  },
]

const COMMITS = [
  {
    hash: 'a3f9c1e',
    date: '2026-01 → 2026-05',
    company: 'BSS Commerce',
    role: 'App Developer',
    branch: 'main',
    apps: BSS_APPS,
    bullets: [
      'Shipped full-stack features across two Shopify apps (OPTIS Color Swatches & Product Options) — NestJS API, Remix/Polaris admin CMS, Lit-based Theme App Extension.',
      'Built storefront variant/option UI (color & image swatches, dropdown/quantity sets) on the Shopify Storefront API, plus admin CMS: live preview, multi-language translations, bulk import/export, plan-based feature gating.',
      'Owned merchant bug reports end-to-end — diagnosed storefront/theme issues (variant picker, gallery rendering, price/watermark, quick view) and third-party integration issues (Crisp CRM), shipping fixes from permanent patches to per-shop runtime overrides.',
      'Both apps are "Built for Shopify" certified and live on the Shopify App Store with a combined 3,000+ reviews at a 4.9+ average rating.',
    ],
  },
  {
    hash: '7c2d4b8',
    date: '2024-09 → 2025-03',
    company: 'FPT Academy → FPT Software',
    role: 'Intern → Fresher React JS',
    branch: 'internship',
    bullets: [
      'Phase 1 — Built core learning flows of a Quizlet-inspired flashcard platform: full CRUD for quiz/question management plus four study modes (Flashcard, Learn, Match, Exam). Worked Agile/Scrum.',
      'Phase 2 — Worked a real-world CRM outsourcing project: implemented feature updates and bug fixes from PM requirements, tested after each change, followed version control standards.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 px-6 bg-bg border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16 font-mono text-sm text-fg-dim">
          <span className="text-teal">$</span> git log --oneline --stat
        </div>

        <div className="space-y-12">
          {COMMITS.map((commit) => (
            <div key={commit.hash} className="relative pl-8 border-l border-border">
              <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-amber" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1 font-mono text-sm">
                <span className="text-amber">commit {commit.hash}</span>
                <span className="text-fg-dim">({commit.branch})</span>
              </div>
              <div className="font-mono text-xs text-fg-dim mb-4">{commit.date}</div>

              <h3 className="text-xl md:text-2xl font-bold text-fg mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {commit.role}
              </h3>
              <p className="text-teal font-mono text-sm mb-4">{commit.company}</p>

              <ul className="space-y-2.5 mb-6">
                {commit.bullets.map((bullet, i) => (
                  <li key={i} className="text-fg-muted leading-relaxed flex gap-3">
                    <span className="text-fg-dim mt-1 shrink-0">+</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {'apps' in commit && commit.apps && (
                <div className="space-y-2">
                  <p className="font-mono text-xs text-fg-dim mb-2">
                    <span className="text-teal">$</span> git submodule status
                  </p>
                  {commit.apps.map((app) => (
                    <a
                      key={app.name}
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('shopify_app_click', { app: app.name })}
                      className="group flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-md border border-border bg-bg-raised hover:border-teal transition-colors"
                    >
                      <div className="flex items-center gap-3 font-mono text-sm">
                        <Image
                          src={app.icon}
                          alt=""
                          width={28}
                          height={28}
                          className="rounded-md shrink-0"
                        />
                        <span className="text-fg group-hover:text-teal transition-colors">{app.name}</span>
                        <span className="text-fg-dim hidden sm:inline">— {app.role}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-fg-dim shrink-0">
                        <span className="text-amber">★ {app.rating}</span>
                        <span>({app.reviews})</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
