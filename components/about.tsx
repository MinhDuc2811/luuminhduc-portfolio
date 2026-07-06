import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 bg-bg border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16 font-mono text-sm text-fg-dim">
          <span className="text-teal">$</span> whoami --verbose
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          <div className="relative mx-auto md:mx-0 w-56 md:w-full">
            <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-amber/20 via-transparent to-teal/20 blur-xl" aria-hidden />
            <div className="relative rounded-xl border border-border overflow-hidden bg-bg-raised">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-bg">
                <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
                <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
                <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
                <span className="ml-2 font-mono text-[10px] text-fg-dim">portrait.jpg</span>
              </div>
              <Image
                src="/luu-minh-duc.jpg"
                alt="Luu Minh Duc"
                width={560}
                height={700}
                className="w-full h-auto object-cover grayscale-[15%] contrast-105"
                priority
              />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Luu Minh Duc
              </h2>
              <p className="font-mono text-sm text-teal">Fullstack Developer · MERN &amp; Next.js</p>
            </div>

            <p className="text-fg-muted leading-relaxed">
              I build products end to end — from database schema and API design to the pixels a user
              actually clicks on. My background spans Shopify app development at{' '}
              <a
                href="https://bsscommerce.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline underline-offset-4 decoration-border hover:text-teal hover:decoration-teal transition-colors"
              >
                BSS Commerce
              </a>
              , a React internship-to-fresher track at{' '}
              <a
                href="https://fptsoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline underline-offset-4 decoration-border hover:text-teal hover:decoration-teal transition-colors"
              >
                FPT Software
              </a>
              , and leading two full-stack side projects from zero to production.
            </p>

            <p className="text-fg-muted leading-relaxed">
              I care about clean, maintainable code and I pick up new tools fast — this site itself is a
              small example: a Next.js CV designed to read like a terminal session instead of a static
              page.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Problem solver', 'Fast learner', 'Team lead experience', 'Ships end to end'].map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1.5 text-xs font-mono text-fg-muted bg-bg-raised border border-border rounded-md"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
