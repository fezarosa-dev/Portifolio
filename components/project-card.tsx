import Link from 'next/link'
import type { Project } from '@/lib/supabase/queries'

export function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.click_mode === 'link'
  const href = isExternal ? project.click_url ?? '#' : `/projetos/${project.id}`

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block rounded-lg border p-6 transition hover:border-foreground"
    >
      <h3 className="text-lg font-medium">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
    </Link>
  )
}
