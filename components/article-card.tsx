import Link from 'next/link'
import type { Article } from '@/lib/supabase/queries'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/artigos/${article.id}`}
      className="group block rounded-lg border border-hairline bg-card p-6 transition-colors hover:border-signal"
    >
      <h3 className="font-display text-lg font-medium tracking-tight">
        {article.title}
        <span className="ml-1 text-signal opacity-0 transition-opacity group-hover:opacity-100">
          ↗
        </span>
      </h3>
      {article.summary && <p className="mt-2 text-sm text-steel">{article.summary}</p>}
    </Link>
  )
}
