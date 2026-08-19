import { Suspense } from 'react'
import { getVisibleProjects } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { ProjectsExplorer } from '@/components/projects-explorer'
import { Eyebrow } from '@/components/eyebrow'

export default async function ProjetosPage() {
  const [projects, { dict }] = await Promise.all([getVisibleProjects(), getDictionary()])
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <Eyebrow>{dict.projetos.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">{dict.projetos.title}</h1>
      <div className="mt-10">
        <Suspense>
          <ProjectsExplorer projects={projects} dict={dict.projetos} />
        </Suspense>
      </div>
    </main>
  )
}
