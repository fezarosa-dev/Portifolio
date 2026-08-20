import Link from 'next/link'
import { resolveText } from '@/lib/bilingual'
import type { Article } from '@/lib/supabase/queries'
import type { Locale } from '@/lib/i18n'

export function ArticleCard({ article, locale = 'pt' }: { article: Article; locale?: Locale }) {
  const title = resolveText(article.title, article.title_en, locale)
  const summary = resolveText(article.summary, article.summary_en, locale)

  return (
    <Link
      href={`/${locale}/artigos/${article.id}`}
      className="group block rounded-lg border border-hairline bg-card p-6 transition-colors hover:border-signal"
    >
      <h3 className="font-display text-lg font-medium tracking-tight">
        {title}
        <span className="ml-1 text-signal opacity-0 transition-opacity group-hover:opacity-100">
          ↗
        </span>
      </h3>
      {summary && <p className="mt-2 text-sm text-steel">{summary}</p>}
    </Link>
  )
}
