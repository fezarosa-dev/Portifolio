import { getResume, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { getDictionary } from '@/lib/i18n'
import { MarkdownContent } from '@/components/markdown-content'
import { Eyebrow } from '@/components/eyebrow'

export default async function CurriculoPage() {
  const [resume, content, { dict }] = await Promise.all([
    getResume(),
    getSiteContent(),
    getDictionary(),
  ])
  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Eyebrow>{dict.curriculo.eyebrow}</Eyebrow>
      <div className="mt-6">
        <MarkdownContent content={resume} driveImages={driveImages} />
      </div>
    </main>
  )
}
