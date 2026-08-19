import { ArticleForm } from '@/components/admin/article-form'
import { saveArticle } from '../actions'

export default function NovoArtigoPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Novo artigo</h1>
      <ArticleForm article={null} action={saveArticle} />
    </div>
  )
}
