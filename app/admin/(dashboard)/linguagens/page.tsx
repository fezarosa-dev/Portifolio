import { getLanguages } from '@/lib/supabase/queries'
import { deviconIconUrl } from '@/lib/devicon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { saveLanguage, removeLanguage } from './actions'

export default async function LinguagensPage() {
  const languages = await getLanguages()

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Linguagens</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Digite o nome da linguagem, framework ou ferramenta (ex: Python, TypeScript, Docker) — o
        ícone é encontrado automaticamente pelo nome.
      </p>

      <form action={saveLanguage} className="mb-8 flex max-w-sm gap-2">
        <Input name="name" placeholder="Nome (ex: Python)" required />
        <Button type="submit">Adicionar</Button>
      </form>

      <ul className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <li
            key={lang.id}
            className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
          >
            {lang.devicon_slug ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={deviconIconUrl(lang.devicon_slug, lang.devicon_variant ?? 'plain')}
                alt=""
                className="h-5 w-5"
              />
            ) : (
              <span className="text-xs text-destructive" title="Ícone não encontrado">
                ⚠
              </span>
            )}
            {lang.name}
            <form action={removeLanguage.bind(null, lang.id)}>
              <button type="submit" className="text-muted-foreground hover:text-destructive">
                ×
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
