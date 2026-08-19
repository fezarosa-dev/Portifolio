import { getResume, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { MarkdownContent } from '@/components/markdown-content'

export default async function CurriculoPage() {
  const [resume, content] = await Promise.all([getResume(), getSiteContent()])
  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <MarkdownContent content={resume} driveImages={driveImages} />
    </main>
  )
}
