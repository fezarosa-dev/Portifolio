'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProjectCard } from '@/components/project-card'
import type { Project, Language } from '@/lib/supabase/queries'

type SortOption = 'recent' | 'oldest' | 'az'

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [techFilter, setTechFilter] = useState<string | null>(searchParams.get('tech'))

  const allLanguages = useMemo(() => {
    const byId = new Map<string, Language>()
    for (const project of projects) {
      for (const lang of project.languages) byId.set(lang.id, lang)
    }
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [projects])

  function updateTechFilter(id: string | null) {
    setTechFilter(id)
    const params = new URLSearchParams(searchParams.toString())
    if (id) params.set('tech', id)
    else params.delete('tech')
    router.replace(params.size > 0 ? `/projetos?${params.toString()}` : '/projetos', {
      scroll: false,
    })
  }

  const visible = useMemo(() => {
    let result = projects

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
      )
    }

    if (techFilter) {
      result = result.filter((p) => p.languages.some((lang) => lang.id === techFilter))
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'az') return a.title.localeCompare(b.title)
      const diff = new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      return sortBy === 'recent' ? diff : -diff
    })

    return result
  }, [projects, query, techFilter, sortBy])

  const activeTech = techFilter ? allLanguages.find((l) => l.id === techFilter) : null

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="buscar por nome…"
          className="w-full rounded-md border border-hairline bg-background px-3 py-2 text-sm sm:max-w-xs"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-md border border-hairline bg-background px-3 py-2 text-sm"
        >
          <option value="recent">mais recentes</option>
          <option value="oldest">mais antigos</option>
          <option value="az">A–Z</option>
        </select>
        {allLanguages.length > 0 && (
          <select
            value={techFilter ?? ''}
            onChange={(e) => updateTechFilter(e.target.value || null)}
            className="rounded-md border border-hairline bg-background px-3 py-2 text-sm"
          >
            <option value="">todas as tecnologias</option>
            {allLanguages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {activeTech && (
        <button
          type="button"
          onClick={() => updateTechFilter(null)}
          className="mt-4 flex items-center gap-1.5 font-mono text-xs text-signal"
        >
          filtrando por {activeTech.name} <span aria-hidden>×</span>
        </button>
      )}

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">Nenhum projeto encontrado.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
