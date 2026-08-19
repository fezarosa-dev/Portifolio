import { getLanguages } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { TechnologyReorderList } from '@/components/admin/technology-reorder-list'
import { saveLanguage, removeLanguage, editLanguage, saveLanguagesOrder } from './actions'

export default async function TecnologiasPage() {
  const languages = await getLanguages()

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Tecnologias</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Digite o nome da linguagem, framework ou ferramenta (ex: Python, TypeScript, Docker) — o
        ícone é encontrado automaticamente pelo nome. Arraste pelos pontinhos pra reordenar como
        aparecem no site.
      </p>

      <ToastForm
        action={saveLanguage}
        successMessage="Tecnologia adicionada"
        className="mb-8 flex max-w-sm gap-2"
      >
        <Input name="name" placeholder="Nome (ex: Python)" required />
        <Button type="submit">Adicionar</Button>
      </ToastForm>

      <TechnologyReorderList
        languages={languages}
        editAction={editLanguage}
        removeAction={removeLanguage}
        saveOrderAction={saveLanguagesOrder}
      />
    </div>
  )
}
