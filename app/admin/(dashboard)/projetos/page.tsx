import Link from 'next/link'
import { getAllProjects } from '@/lib/supabase/admin-queries'
import { Button } from '@/components/ui/button'
import { removeProject, toggleVisibility } from './actions'

export default async function AdminProjetosPage() {
  const projects = await getAllProjects()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projetos</h1>
        <Button render={<Link href="/admin/projetos/novo" />}>Novo projeto</Button>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Título</th>
            <th>Visível</th>
            <th>Ao clicar</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="py-2">{project.title}</td>
              <td>
                <form action={toggleVisibility.bind(null, project.id, !project.visible)}>
                  <button type="submit" className="underline">
                    {project.visible ? 'Visível' : 'Oculto'}
                  </button>
                </form>
              </td>
              <td>{project.click_mode === 'link' ? 'Link' : 'Página'}</td>
              <td className="flex gap-2 py-2">
                <Link href={`/admin/projetos/${project.id}`} className="underline">
                  Editar
                </Link>
                <form action={removeProject.bind(null, project.id)}>
                  <button type="submit" className="text-destructive underline">
                    Excluir
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
