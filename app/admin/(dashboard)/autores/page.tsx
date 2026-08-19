import { getAuthors } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

      <form action={saveAuthor} className="mb-8 flex max-w-sm gap-2">
        <Input name="name" placeholder="Nome" required />
        <Button type="submit">Adicionar</Button>
      </form>

      {authors.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum autor ainda.</p>
      ) : (
        <ul className="flex max-w-md flex-col gap-2">
          {authors.map((author) => (
            <li key={author.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
              <form action={editAuthor.bind(null, author.id)} className="flex flex-1 gap-2">
                <Input name="name" defaultValue={author.name} className="h-8" />
                <Button type="submit" variant="outline" size="sm">
                  Salvar
                </Button>
              </form>
              <form action={removeAuthor.bind(null, author.id)}>
                <button type="submit" className="px-1 text-muted-foreground hover:text-destructive">
                  ×
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
