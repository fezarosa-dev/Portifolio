import { notFound } from 'next/navigation'
import { getProjectById, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { MarkdownContent } from '@/components/markdown-content'

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
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-semibold">{project.title}</h1>
      <MarkdownContent content={project.content_md} driveImages={driveImages} />
    </main>
  )
}
