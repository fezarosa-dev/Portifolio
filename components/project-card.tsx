import Link from 'next/link'
import type { Project } from '@/lib/supabase/queries'

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.click_mode === 'link'
  const href = isExternal ? project.click_url ?? '#' : `/projetos/${project.id}`

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block rounded-lg border border-hairline bg-card p-6 transition-colors hover:border-signal"
    >
      <h3 className="font-display text-lg font-medium tracking-tight">
        {project.title}
        <span className="ml-1 text-signal opacity-0 transition-opacity group-hover:opacity-100">
          ↗
        </span>
      </h3>
      <p className="mt-2 text-sm text-steel">{project.summary}</p>
      {(project.repo_url || project.site_url) && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-steel">
          {project.repo_url && <span className="truncate">{hostname(project.repo_url)}</span>}
          {project.site_url && <span className="truncate">{hostname(project.site_url)}</span>}
        </div>
      )}
    </Link>
  )
}
