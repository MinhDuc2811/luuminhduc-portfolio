export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 bg-bg border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-fg-dim">
        <p>&copy; {currentYear} Luu Minh Duc. Built with Next.js.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal" />
          available for work
        </p>
      </div>
    </footer>
  )
}
