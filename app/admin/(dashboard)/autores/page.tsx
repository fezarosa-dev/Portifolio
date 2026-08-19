import { getAuthors } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { saveAuthor, removeAuthor, editAuthor } from './actions'

export default async function AutoresPage() {
  const authors = await getAuthors()

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Autores</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Pessoas que colaboraram nos seus projetos — depois é só marcar quem participou de cada
        projeto na aba Projetos.
      </p>

      <ToastForm action={saveAuthor} successMessage="Autor adicionado" className="mb-8 flex max-w-sm gap-2">
        <Input name="name" placeholder="Nome" required />
        <Button type="submit">Adicionar</Button>
      </ToastForm>

      {authors.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum autor ainda.</p>
      ) : (
        <ul className="flex max-w-md flex-col gap-2">
          {authors.map((author) => (
            <li key={author.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
              <ToastForm
                action={editAuthor.bind(null, author.id)}
                successMessage="Autor atualizado"
                className="flex flex-1 gap-2"
              >
                <Input name="name" defaultValue={author.name} className="h-8" />
                <Button type="submit" variant="outline" size="sm">
                  Salvar
                </Button>
              </ToastForm>
              <ToastForm action={removeAuthor.bind(null, author.id)} successMessage="Autor removido">
                <button type="submit" className="px-1 text-muted-foreground hover:text-destructive">
                  ×
                </button>
              </ToastForm>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
