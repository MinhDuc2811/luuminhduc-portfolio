'use client'

import type { Locale } from '@/lib/proposal-content'

const SECTIONS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7']

export default function ProposalHeader({
  locale,
  onLocaleChange,
  navLabel,
  navTitles,
  activeSlide,
  onNavigate,
}: {
  locale: Locale
  onLocaleChange: (l: Locale) => void
  navLabel: string
  navTitles: string[]
  activeSlide: number
  onNavigate: (index: number) => void
}) {
  const progress = (activeSlide / (SECTIONS.length + 1 - 1)) * 100

  return (
    <>
      <div
        className="fixed top-0 left-0 h-0.5 bg-amber z-[60] transition-[width] duration-300"
        style={{ width: `${progress}%` }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 px-6 py-3">
          <button
            type="button"
            onClick={() => onNavigate(0)}
            className="flex items-center gap-2 font-mono text-[13px] whitespace-nowrap"
          >
            <span className="text-teal">$</span>
            <span className="text-fg">{navLabel}</span>
          </button>

          <nav className="flex items-center gap-0.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {SECTIONS.map((id, i) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(i + 1)}
                title={navTitles[i]}
                className={`px-2.5 py-1.5 font-mono text-xs rounded-md whitespace-nowrap transition-colors ${
                  activeSlide === i + 1 ? 'text-amber bg-bg-raised' : 'text-fg-dim hover:text-amber hover:bg-bg-raised'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1 font-mono text-xs shrink-0">
            <button
              onClick={() => onLocaleChange('vi')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${locale === 'vi' ? 'bg-amber text-bg' : 'text-fg-dim hover:text-fg'}`}
            >
              VI
            </button>
            <button
              onClick={() => onLocaleChange('en')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${locale === 'en' ? 'bg-amber text-bg' : 'text-fg-dim hover:text-fg'}`}
            >
              EN
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
