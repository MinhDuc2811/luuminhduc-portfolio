'use client'

import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

const PROJECTS = [
  {
    name: 'RetroTrade',
    period: '09/2025 – 12/2025',
    image: '/projects/retrotrade.png',
    role: 'Fullstack Developer & Leader · team of 5',
    description:
      'A comprehensive rental platform for sharing, renting, and reusing items to promote sustainable consumption in Vietnam.',
    highlights: [
      'Multi-provider auth with OTP phone verification (Twilio) for account trust',
      'Identity verification pipeline: OCR ID-card extraction + face-matching against the card photo',
      'End-to-end rental flow: date-range cart → cost calculation → order lifecycle → dispute handling',
      'Admin dashboard with revenue/order analytics via MongoDB aggregation pipelines',
      'AI content moderation (Gemini) with automated ban/penalty enforcement',
      'Real-time notifications & messaging via Socket.io and Server-Sent Events',
      'E-contract system: auto-generated agreements with AES-encrypted signatures, rendered to PDF via Puppeteer',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Twilio', 'SSE'],
    links: [
      { label: 'live', href: 'https://retrotrade.id.vn' },
      { label: 'github', href: 'https://github.com/dinhduclinh/RetroTrade' },
    ],
  },
  {
    name: 'Nutigo',
    period: '01/2025 – 03/2025',
    image: '/projects/nutigo.png',
    role: 'Fullstack Developer & Leader · team of 4',
    description:
      'A distribution platform for healthy food products (mixed grains, seed-based snacks) supporting wholesale ordering and partner management in Vietnam.',
    highlights: [
      'Full MERN shopping flow: catalog → cart → VNPay checkout → order tracking → reviews',
      'Back-office order fulfillment: sales-role assignment with real-time inventory deduction',
      'Self-expiring discount engine via scheduled cron jobs (percentage & fixed-amount)',
      'AI customer chatbot (Google Gemini) + hybrid real-time chat (MongoDB + Firebase Firestore)',
      'Multi-layer auth: email OTP, Google OAuth, token-based sessions',
      'Deployed to production on Docker + Linux with a custom domain',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Docker'],
    links: [
      { label: 'site', href: 'https://www.nutigo.id.vn' },
      { label: 'github', href: 'https://github.com/KetXanh/WDP301_PROJECT_8' },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 px-6 bg-bg-raised border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16 font-mono text-sm text-fg-dim">
          <span className="text-teal">$</span> ls -la ./projects
        </div>

        <div className="space-y-10">
          {PROJECTS.map((project) => (
            <div key={project.name} className="rounded-lg border border-border bg-bg overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-fg-dim">#</span>
                  <span className="text-fg font-medium">README.md</span>
                  <span className="text-fg-dim">— {project.name}</span>
                </div>
                <span className="font-mono text-xs text-fg-dim">{project.period}</span>
              </div>

              <div className="relative aspect-video bg-bg-raised border-b border-border overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-fg mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {project.name}
                  </h3>
                  <p className="text-teal font-mono text-sm">{project.role}</p>
                </div>

                <p className="text-fg-muted leading-relaxed">{project.description}</p>

                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-fg-muted text-sm leading-relaxed flex gap-3">
                      <span className="text-amber shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono bg-bg-raised text-fg-muted rounded border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2 font-mono text-sm">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_link_click', { project: project.name, type: link.label })}
                      className="text-fg hover:text-amber transition-colors"
                    >
                      [{link.label}]
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
