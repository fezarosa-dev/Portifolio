import Link from 'next/link'
import { getAllArticles } from '@/lib/supabase/admin-queries'
import { getSiteContent } from '@/lib/supabase/queries'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { ArtigosAtivoToggle } from '@/components/admin/artigos-ativo-toggle'
import { removeArticle, toggleArticleVisibility, toggleArtigosAtivo } from './actions'

export default async function AdminArtigosPage() {
  const [articles, content] = await Promise.all([getAllArticles(), getSiteContent()])
  const artigosAtivo = content.artigos_ativo !== 'false'

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Artigos</h1>
        <Button render={<Link href="/admin/artigos/novo" />}>Novo artigo</Button>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-lg border border-hairline bg-card p-4">
        <ArtigosAtivoToggle ativo={artigosAtivo} action={toggleArtigosAtivo} />
        <p className="font-mono text-xs text-steel">
          quando desligado, o item &quot;Artigos&quot; some do menu do site
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum artigo ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-hairline">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="bg-card font-mono text-xs text-steel">
              <tr>
                <th className="px-4 py-3 font-normal">Título</th>
                <th className="px-4 py-3 font-normal">Visível</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t border-hairline">
                  <td className="px-4 py-3 font-medium">{article.title}</td>
                  <td className="px-4 py-3">
                    <form action={toggleArticleVisibility.bind(null, article.id, !article.visible)}>
                      <button
                        type="submit"
                        className={
                          article.visible
                            ? 'font-mono text-xs text-status'
                            : 'font-mono text-xs text-steel'
                        }
                      >
                        {article.visible ? '● visível' : '○ oculto'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/artigos/${article.id}`}
                        className="text-signal hover:underline"
                      >
                        editar
                      </Link>
                      <ToastForm
                        action={removeArticle.bind(null, article.id)}
                        successMessage="Artigo excluído"
                      >
                        <button type="submit" className="text-destructive hover:underline">
                          excluir
                        </button>
                      </ToastForm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
