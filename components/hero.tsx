'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

type Line = { prompt: string; output: string | string[]; kind?: 'intro' | 'user' }

const INTRO_LINES: Line[] = [
  { prompt: 'whoami', output: 'Luu Minh Duc' },
  { prompt: 'cat role.md', output: 'Fullstack Developer' },
  {
    prompt: 'cat objective.md',
    output: [
      'Full-stack developer comfortable with both backend (APIs, logic)',
      'and frontend (React/Next.js). Real-world experience shipping',
      'Shopify apps. Writes clean code, picks up new tech fast.',
    ],
  },
  { prompt: 'echo $LOCATION', output: 'Phu Tho, Vietnam' },
]

const COMMANDS: Record<string, { output: string[]; href?: string }> = {
  help: {
    output: [
      'available commands:',
      '  about        jump to the about section',
      '  experience   jump to work experience',
      '  projects     jump to featured projects',
      '  skills       jump to tech stack',
      '  contact      jump to contact info',
      '  cv           download resume as PDF',
      '  clear        clear the terminal',
    ],
  },
  about: { output: ['→ scrolling to #about ...'], href: '#about' },
  experience: { output: ['→ scrolling to #experience ...'], href: '#experience' },
  projects: { output: ['→ scrolling to #projects ...'], href: '#projects' },
  skills: { output: ['→ scrolling to #skills ...'], href: '#skills' },
  contact: { output: ['→ scrolling to #contact ...'], href: '#contact' },
  cv: { output: ['→ downloading cv-luu-minh-duc.pdf ...'], href: '/cv-luu-minh-duc.pdf' },
  sudo: { output: ["nice try. you don't need root — just scroll."] },
}

const TYPE_SPEED = 18
const LINE_PAUSE = 260

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showOutput, setShowOutput] = useState<boolean[]>([])
  const [introDone, setIntroDone] = useState(false)
  const [history, setHistory] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineIndex >= INTRO_LINES.length) {
      setIntroDone(true)
      return
    }

    const current = INTRO_LINES[lineIndex].prompt

    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(t)
    }

    const revealTimer = setTimeout(() => {
      setShowOutput((prev) => {
        const next = [...prev]
        next[lineIndex] = true
        return next
      })
      const advanceTimer = setTimeout(() => {
        setLineIndex((i) => i + 1)
        setCharIndex(0)
      }, LINE_PAUSE)
      return () => clearTimeout(advanceTimer)
    }, 120)

    return () => clearTimeout(revealTimer)
  }, [charIndex, lineIndex])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history, introDone])

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    const match = COMMANDS[cmd]
    const entry: Line = {
      prompt: raw,
      kind: 'user',
      output: match ? match.output : [`command not found: ${cmd}`, 'type "help" to see available commands'],
    }
    setHistory((prev) => [...prev, entry])
    trackEvent('terminal_command', { command: cmd, matched: String(!!match) })

    if (match?.href) {
      setTimeout(() => {
        if (match.href!.startsWith('/')) {
          const a = document.createElement('a')
          a.href = match.href!
          a.download = ''
          a.click()
        } else {
          document.querySelector(match.href!)?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }

  return (
    <section className="pt-32 pb-20 px-6 md:pb-32 md:pt-44 bg-grid bg-bg">
      <div className="max-w-4xl mx-auto grid gap-10 md:gap-14">
        <div className="animate-fade-up">
          <p className="font-mono text-sm text-teal mb-4">$ fullstack developer / open to work</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-fg text-balance leading-[1.1] text-glow" style={{ fontFamily: 'var(--font-display)' }}>
            Building products end to end,
            <br />
            from database to pixel.
          </h1>
        </div>

        <div
          className="rounded-lg border border-border bg-bg-raised shadow-2xl shadow-black/40 overflow-hidden animate-fade-up"
          style={{ animationDelay: '0.15s' }}
          onClick={() => introDone && inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg">
            <span className="w-3 h-3 rounded-full bg-fg-dim/40" />
            <span className="w-3 h-3 rounded-full bg-fg-dim/40" />
            <span className="w-3 h-3 rounded-full bg-fg-dim/40" />
            <span className="ml-3 font-mono text-xs text-fg-dim">duc@fullstack:~</span>
          </div>

          <div ref={scrollRef} className="p-6 font-mono text-sm md:text-base leading-relaxed min-h-[240px] max-h-[360px] overflow-y-auto">
            {INTRO_LINES.slice(0, lineIndex + 1).map((line, i) => {
              const isCurrent = i === lineIndex
              const typedPrompt = isCurrent ? line.prompt.slice(0, charIndex) : line.prompt
              const outputVisible = showOutput[i]

              return (
                <div key={i} className="mb-3">
                  <div className="flex gap-2">
                    <span className="text-amber">$</span>
                    <span className="text-fg">
                      {typedPrompt}
                      {isCurrent && !introDone && <span className="caret text-amber">▍</span>}
                    </span>
                  </div>
                  {outputVisible && (
                    <div className="pl-4 text-fg-muted">
                      {Array.isArray(line.output) ? (
                        line.output.map((o, oi) => <div key={oi}>{o}</div>)
                      ) : (
                        <div>
                          <span className="text-teal">→</span> {line.output}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {introDone &&
              history.map((line, i) => (
                <div key={i} className="mb-3">
                  <div className="flex gap-2">
                    <span className="text-amber">$</span>
                    <span className="text-fg">{line.prompt}</span>
                  </div>
                  <div className="pl-4 text-fg-muted">
                    {(line.output as string[]).map((o, oi) => (
                      <div key={oi}>{o}</div>
                    ))}
                  </div>
                </div>
              ))}

            {introDone && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  runCommand(input)
                  setInput('')
                }}
                className="flex gap-2"
              >
                <span className="text-amber">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-fg caret-amber"
                  placeholder='type "help"'
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#contact"
            onClick={() => trackEvent('cta_click', { target: 'contact', location: 'hero' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
          >
            get in touch →
          </a>
          <a
            href="#projects"
            onClick={() => trackEvent('cta_click', { target: 'projects', location: 'hero' })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
          >
            view projects
          </a>
          <a
            href="/cv-luu-minh-duc.pdf"
            download
            onClick={() => trackEvent('cv_download', { location: 'hero' })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg-muted font-mono text-sm font-medium rounded-md hover:border-teal hover:text-teal transition-colors"
          >
            ↓ download cv.pdf
          </a>
        </div>
      </div>
    </section>
  )
}
