'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '#about', label: 'about' },
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'projects' },
  { href: '#skills', label: 'skills' },
  { href: '#contact', label: 'contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/70 border-b border-border z-50">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between font-mono text-sm">
        <Link href="/" className="text-fg tracking-tight">
          <span className="text-amber">~/</span>luu-minh-duc
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-fg hover:text-amber transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        <ul className="hidden md:flex gap-8 text-fg-muted">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-amber transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-bg border-b border-border md:hidden">
            <ul className="flex flex-col gap-4 p-6 text-fg-muted">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setIsOpen(false)} className="hover:text-amber transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
