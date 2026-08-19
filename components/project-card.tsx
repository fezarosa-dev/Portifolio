import Link from 'next/link'
import { deviconIconUrl } from '@/lib/devicon'
import { joinNames } from '@/lib/utils'
import type { Project } from '@/lib/supabase/queries'

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function ProjectCard({
  project,
  withLabel = 'com',
}: {
  project: Project
  withLabel?: string
}) {
  const isExternal = project.click_mode === 'link'
  const href = isExternal ? project.click_url ?? '#' : `/projetos/${project.id}`

  return (
    <div className="group rounded-lg border border-hairline bg-card p-6 transition-colors hover:border-signal">
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block"
      >
        <h3 className="font-display text-lg font-medium tracking-tight">
          {project.title}
          <span className="ml-1 text-signal opacity-0 transition-opacity group-hover:opacity-100">
            ↗
          </span>
        </h3>
        <p className="mt-2 text-sm text-steel">{project.summary}</p>
        {project.authors.length > 0 && (
          <p className="mt-2 font-mono text-xs text-steel">
            {withLabel} {joinNames(project.authors.map((a) => a.name))}
          </p>
        )}
        {(project.repo_url || project.site_url) && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-steel">
            {project.repo_url && <span className="break-words">{hostname(project.repo_url)}</span>}
            {project.site_url && <span className="break-words">{hostname(project.site_url)}</span>}
          </div>
        )}
      </Link>
      {project.languages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline pt-4">
          {project.languages.map((lang) => (
            <Link
              key={lang.id}
              href={`/projetos?tech=${lang.id}`}
              title={`Ver projetos com ${lang.name}`}
              className="flex items-center gap-1 rounded-full border border-hairline px-2 py-1 font-mono text-[11px] text-steel hover:border-signal hover:text-signal"
            >
              {lang.devicon_slug && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={deviconIconUrl(lang.devicon_slug, lang.devicon_variant ?? 'plain')}
                  alt=""
                  className="h-3.5 w-3.5"
                />
              )}
              {lang.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
