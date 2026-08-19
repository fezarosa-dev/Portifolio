import { getLanguages } from '@/lib/supabase/queries'
import { deviconIconUrl } from '@/lib/devicon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { saveLanguage, removeLanguage, editLanguage, moveLanguage } from './actions'

export default async function TecnologiasPage() {
  const languages = await getLanguages()

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Tecnologias</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Digite o nome da linguagem, framework ou ferramenta (ex: Python, TypeScript, Docker) — o
        ícone é encontrado automaticamente pelo nome. Use as setas para reordenar como aparecem no
        site.
      </p>

      <form action={saveLanguage} className="mb-8 flex max-w-sm gap-2">
        <Input name="name" placeholder="Nome (ex: Python)" required />
        <Button type="submit">Adicionar</Button>
      </form>

      <ul className="flex max-w-md flex-col gap-2">
        {languages.map((lang, index) => (
          <li key={lang.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
            <div className="flex shrink-0 flex-col">
              <form action={moveLanguage.bind(null, lang.id, 'up')}>
                <button
                  type="submit"
                  disabled={index === 0}
                  className="text-muted-foreground hover:text-signal disabled:opacity-30"
                  aria-label="Mover para cima"
                >
                  ↑
                </button>
              </form>
              <form action={moveLanguage.bind(null, lang.id, 'down')}>
                <button
                  type="submit"
                  disabled={index === languages.length - 1}
                  className="text-muted-foreground hover:text-signal disabled:opacity-30"
                  aria-label="Mover para baixo"
                >
                  ↓
                </button>
              </form>
            </div>
            {lang.devicon_slug ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={deviconIconUrl(lang.devicon_slug, lang.devicon_variant ?? 'plain')}
                alt=""
                className="h-5 w-5 shrink-0"
              />
            ) : (
              <span className="shrink-0 text-xs text-destructive" title="Ícone não encontrado">
                ⚠
              </span>
            )}
            <form action={editLanguage.bind(null, lang.id)} className="flex flex-1 gap-2">
              <Input name="name" defaultValue={lang.name} className="h-8" />
              <Button type="submit" variant="outline" size="sm">
                Salvar
              </Button>
            </form>
            <form action={removeLanguage.bind(null, lang.id)}>
              <button type="submit" className="px-1 text-muted-foreground hover:text-destructive">
                ×
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
