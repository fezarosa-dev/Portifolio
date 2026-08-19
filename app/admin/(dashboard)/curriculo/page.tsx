import { getResume } from '@/lib/supabase/queries'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { saveResume } from './actions'

export default async function CurriculoAdminPage() {
  const resume = await getResume()

  return (
    <form action={saveResume} className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-2xl font-semibold">Currículo</h1>
      <p className="text-sm text-muted-foreground">
        Use nomes de arquivos da pasta do Drive para imagens, ex: <code>![foto](minha-foto.jpg)</code>. Veja a aba Imagens para os nomes disponíveis.
      </p>
      <Textarea name="content_md" defaultValue={resume} rows={20} />
      <Button type="submit">Salvar</Button>
    </form>
  )
}
