import { getResume, getResumeLinks, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { getDictionary } from '@/lib/i18n'
import { MarkdownContent } from '@/components/markdown-content'
import { Eyebrow } from '@/components/eyebrow'
import { FadeIn } from '@/components/fade-in'

export default async function CurriculoPage() {
  const [resume, links, content, { dict }] = await Promise.all([
    getResume(),
    getResumeLinks(),
    getSiteContent(),
    getDictionary(),
  ])
  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <FadeIn>
        <Eyebrow>{dict.curriculo.eyebrow}</Eyebrow>
      </FadeIn>
      {links.length > 0 && (
        <FadeIn delay={0.1}>
          <ul className="mt-4 flex flex-wrap gap-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 font-mono text-xs text-steel transition-colors hover:border-signal hover:text-signal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      )}
      <div className="mt-6">
        <MarkdownContent content={resume} driveImages={driveImages} />
      </div>
    </main>
  )
}
