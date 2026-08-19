import { ProjectForm } from '@/components/admin/project-form'
import { saveProject } from '../actions'

export default function NovoProjetoPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Novo projeto</h1>
      <ProjectForm project={null} action={saveProject} />
    </div>
  )
}
