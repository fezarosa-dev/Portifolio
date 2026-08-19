import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/supabase/admin-queries'
import { ArticleForm } from '@/components/admin/article-form'
import { saveArticle } from '../actions'

export default async function EditarArtigoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const articles = await getAllArticles()
  const article = articles.find((a) => a.id === id)
  if (!article) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Editar artigo</h1>
      <ArticleForm article={article} action={saveArticle} />
    </div>
  )
}
