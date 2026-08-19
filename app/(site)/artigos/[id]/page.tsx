import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleById, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { getDictionary } from '@/lib/i18n'
import { MarkdownContent } from '@/components/markdown-content'
import { Eyebrow } from '@/components/eyebrow'
import { FadeIn } from '@/components/fade-in'

export default async function ArtigoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [article, content, { dict }] = await Promise.all([
    getArticleById(id),
    getSiteContent(),
    getDictionary(),
  ])
  if (!article || content.artigos_ativo === 'false') notFound()

  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <FadeIn>
        <Link href="/artigos" className="font-mono text-xs text-steel hover:text-signal">
          {dict.artigos.back}
        </Link>
        <Eyebrow>{dict.artigos.detailEyebrow}</Eyebrow>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{article.title}</h1>
      </FadeIn>
      <div className="mt-10">
        <MarkdownContent content={article.content_md} driveImages={driveImages} />
      </div>
    </main>
  )
}
