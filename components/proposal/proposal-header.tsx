'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/proposal-content'

const SECTIONS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7']

export default function ProposalHeader({
  locale,
  onLocaleChange,
  navLabel,
  navTitles,
}: {
  locale: Locale
  onLocaleChange: (l: Locale) => void
  navLabel: string
  navTitles: string[]
}) {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('s1')

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 h-0.5 bg-amber z-[60] transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 px-6 py-3">
          <a href="#top" className="flex items-center gap-2 font-mono text-[13px] whitespace-nowrap">
            <span className="text-teal">$</span>
            <span className="text-fg">{navLabel}</span>
          </a>

          <nav className="flex items-center gap-0.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {SECTIONS.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                title={navTitles[i]}
                className={`px-2.5 py-1.5 font-mono text-xs rounded-md whitespace-nowrap transition-colors ${
                  activeSection === id ? 'text-amber bg-bg-raised' : 'text-fg-dim hover:text-amber hover:bg-bg-raised'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </a>
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
