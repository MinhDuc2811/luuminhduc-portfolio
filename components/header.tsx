'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          Portfolio
        </Link>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 text-secondary font-medium">
          <li><a href="#work" className="hover:text-foreground transition-colors">Work</a></li>
          <li><a href="#services" className="hover:text-foreground transition-colors">Services</a></li>
          <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
        </ul>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <ul className="flex flex-col gap-4 p-6 text-secondary font-medium">
              <li><a href="#work" onClick={() => setIsOpen(false)} className="hover:text-foreground transition-colors">Work</a></li>
              <li><a href="#services" onClick={() => setIsOpen(false)} className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
