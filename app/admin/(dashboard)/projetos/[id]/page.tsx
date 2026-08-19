import { notFound } from 'next/navigation'
import { getAllProjects } from '@/lib/supabase/admin-queries'
import { ProjectForm } from '@/components/admin/project-form'
import { saveProject } from '../actions'

export default async function EditarProjetoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const projects = await getAllProjects()
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Editar projeto</h1>
      <ProjectForm project={project} action={saveProject} />
    </div>
  )
}
