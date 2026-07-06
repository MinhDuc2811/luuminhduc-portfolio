import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg bg-grid flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-lg border border-border bg-bg-raised shadow-2xl shadow-black/40 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg">
          <span className="w-3 h-3 rounded-full bg-fg-dim/40" />
          <span className="w-3 h-3 rounded-full bg-fg-dim/40" />
          <span className="w-3 h-3 rounded-full bg-fg-dim/40" />
          <span className="ml-3 font-mono text-xs text-fg-dim">duc@fullstack:~</span>
        </div>

        <div className="p-6 font-mono text-sm md:text-base leading-relaxed">
          <div className="flex gap-2 mb-3">
            <span className="text-amber">$</span>
            <span className="text-fg">open ./this-page</span>
          </div>
          <div className="pl-4 text-fg-muted mb-4">
            <div className="text-amber">error: 404 — no such file or directory</div>
            <div>the page you&apos;re looking for doesn&apos;t exist.</div>
          </div>

          <div className="flex gap-2">
            <span className="text-amber">$</span>
            <span className="text-fg">cd ~</span>
          </div>
          <div className="pl-4 text-fg-muted mb-6">
            <span className="text-teal">→</span> heading back home is probably your best move.
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber text-bg font-mono text-sm font-medium rounded-md hover:bg-amber/90 transition-colors"
          >
            cd ~ →
          </Link>
        </div>
      </div>
    </div>
  )
}
