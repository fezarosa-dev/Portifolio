import { getLanguages } from '@/lib/supabase/queries'
import { ProjectForm } from '@/components/admin/project-form'
import { saveProject } from '../actions'

export default async function NovoProjetoPage() {
  const availableLanguages = await getLanguages()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Novo projeto</h1>
      <ProjectForm project={null} availableLanguages={availableLanguages} action={saveProject} />
    </div>
  )
}
