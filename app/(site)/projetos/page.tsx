import { Suspense } from 'react'
import { getVisibleProjects } from '@/lib/supabase/queries'
import { ProjectsExplorer } from '@/components/projects-explorer'
import { Eyebrow } from '@/components/eyebrow'

export default async function ProjetosPage() {
  const projects = await getVisibleProjects()
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <Eyebrow>projetos</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">Projetos</h1>
      <div className="mt-10">
        <Suspense>
          <ProjectsExplorer projects={projects} />
        </Suspense>
      </div>
    </main>
  )
}
