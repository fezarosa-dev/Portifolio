import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectById, getSiteContent } from '@/lib/supabase/queries'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'
import { deviconIconUrl } from '@/lib/devicon'
import { joinNames } from '@/lib/utils'
import { getDictionary } from '@/lib/i18n'
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

  const [content, { dict }] = await Promise.all([getSiteContent(), getDictionary()])
  const folderId = content.drive_folder_url ? parseDriveFolderId(content.drive_folder_url) : null
  const driveImages = folderId ? await listDriveImages(folderId) : []

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/projetos" className="font-mono text-xs text-steel hover:text-signal">
        {dict.projetos.back}
      </Link>
      <Eyebrow>{dict.projetos.detailEyebrow}</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">{project.title}</h1>
      {project.authors.length > 0 && (
        <p className="mt-2 font-mono text-sm text-steel">
          {dict.projetos.with} {joinNames(project.authors.map((a) => a.name))}
        </p>
      )}
      {(project.repo_url || project.site_url) && (
        <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-hairline px-3 py-1 text-steel hover:border-signal hover:text-signal"
            >
              {dict.projetos.repo}
            </a>
          )}
          {project.site_url && (
            <a
              href={project.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-hairline px-3 py-1 text-steel hover:border-signal hover:text-signal"
            >
              {dict.projetos.site}
            </a>
          )}
        </div>
      )}
      {project.languages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.languages.map((lang) => (
            <Link
              key={lang.id}
              href={`/projetos?tech=${lang.id}`}
              title={`Ver projetos com ${lang.name}`}
              className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 font-mono text-xs text-steel hover:border-signal hover:text-signal"
            >
              {lang.devicon_slug && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={deviconIconUrl(lang.devicon_slug, lang.devicon_variant ?? 'plain')}
                  alt=""
                  className="h-3.5 w-3.5"
                />
              )}
              {lang.name}
            </Link>
          ))}
        </div>
      )}
      <div className="mt-10">
        <MarkdownContent content={project.content_md} driveImages={driveImages} />
      </div>
    </main>
  )
}
