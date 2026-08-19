import { getVisibleProjects } from '@/lib/supabase/queries'
import { ProjectCard } from '@/components/project-card'
import { Eyebrow } from '@/components/eyebrow'

export default async function ProjetosPage() {
  const projects = await getVisibleProjects()
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <Eyebrow>projetos</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">Projetos</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
