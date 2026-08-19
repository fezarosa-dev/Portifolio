'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProjectCard } from '@/components/project-card'
import { TechCombobox } from '@/components/tech-combobox'
import type { Project, Language } from '@/lib/supabase/queries'

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')
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

    return result
  }, [projects, query, techFilter])

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
        {allLanguages.length > 0 && (
          <TechCombobox
            languages={allLanguages}
            onSelect={(lang) => updateTechFilter(lang.id)}
          />
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

      <div className="mt-8 min-h-[240px]">
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum projeto encontrado.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
