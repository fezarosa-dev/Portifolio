import { getVisibleProjects } from '@/lib/supabase/queries'
import { ProjectCard } from '@/components/project-card'

export default async function ProjetosPage() {
  const projects = await getVisibleProjects()
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-semibold">Projetos</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}
