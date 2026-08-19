import { getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId, resolveDriveImageUrl } from '@/lib/drive'
import { getDictionary } from '@/lib/i18n'
import { Eyebrow } from '@/components/eyebrow'

export default async function SobrePage() {
  const [content, { dict }] = await Promise.all([getSiteContent(), getDictionary()])
  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []
  const photoUrl = content.sobre_foto ? resolveDriveImageUrl(content.sobre_foto, driveImages) : null

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Eyebrow>{dict.sobre.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">{dict.sobre.title}</h1>
      {photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt="Felipe Zanoni da Rosa"
          className="mt-8 h-64 w-64 rounded-full border border-hairline object-cover"
        />
      )}
      <p className="mt-8 text-lg leading-relaxed text-foreground/90">{content.sobre_texto}</p>
    </main>
  )
}
