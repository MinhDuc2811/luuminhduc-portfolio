const SKILL_GROUPS = [
  { key: 'languages', tags: ['JavaScript', 'TypeScript', 'Java'] },
  { key: 'frameworks', tags: ['React', 'Next.js', 'NestJS', 'Redux Toolkit', 'TanStack Query'] },
  { key: 'database', tags: ['MongoDB', 'MySQL', 'SQL Server', 'PostgreSQL', 'GraphQL'] },
  { key: 'other', tags: ['Socket.io', 'Firebase'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 px-6 bg-bg border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16 font-mono text-sm text-fg-dim">
          <span className="text-teal">$</span> cat package.json | jq .dependencies
        </div>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.key}>
              <h3 className="font-mono text-sm text-fg-dim mb-3">
                <span className="text-amber">&quot;{group.key}&quot;</span>:
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-mono text-fg bg-bg-raised border border-border rounded-md hover:border-teal hover:text-teal transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-border">
          <h3 className="font-mono text-sm text-fg-dim mb-4">
            <span className="text-teal">$</span> cat education.md
          </h3>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-fg font-medium">FPT University</p>
              <p className="text-fg-muted text-sm">Software Engineering</p>
            </div>
            <span className="font-mono text-sm text-fg-dim">2021 – 2025</span>
          </div>
        </div>
      </div>
    </section>
  )
}
