import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVisibleArticles, getSiteContent } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { ArticleCard } from '@/components/article-card'
import { Eyebrow } from '@/components/eyebrow'
import { FadeIn } from '@/components/fade-in'

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Artigos escritos por Felipe Zanoni da Rosa sobre desenvolvimento de software.',
}

export default async function ArtigosPage() {
  const [articles, content, { dict, locale }] = await Promise.all([
    getVisibleArticles(),
    getSiteContent(),
    getDictionary(),
  ])
  if (content.artigos_ativo === 'false') notFound()

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <FadeIn>
        <Eyebrow>{dict.artigos.eyebrow}</Eyebrow>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{dict.artigos.title}</h1>
      </FadeIn>
      <div className="mt-10">
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">{dict.artigos.notFound}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {articles.map((article, i) => (
              <FadeIn key={article.id} delay={i * 0.06}>
                <ArticleCard article={article} locale={locale} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
