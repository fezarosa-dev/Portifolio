import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectById, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { MarkdownContent } from '@/components/markdown-content'
import { Eyebrow } from '@/components/eyebrow'

export default async function ProjetoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()
  if (project.click_mode === 'link') notFound()

  const content = await getSiteContent()
  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/projetos" className="font-mono text-xs text-steel hover:text-signal">
        ← projetos
      </Link>
      <Eyebrow>projeto</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">{project.title}</h1>
      {(project.repo_url || project.site_url) && (
        <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-hairline px-3 py-1 text-steel hover:border-signal hover:text-signal"
            >
              repositório ↗
            </a>
          )}
          {project.site_url && (
            <a
              href={project.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-hairline px-3 py-1 text-steel hover:border-signal hover:text-signal"
            >
              site ↗
            </a>
          )}
        </div>
      )}
      <div className="mt-10">
        <MarkdownContent content={project.content_md} driveImages={driveImages} />
      </div>
    </main>
  )
}
