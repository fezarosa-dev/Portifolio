import { getResume, getResumeLinks } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { LinkListReorder } from '@/components/admin/link-list-reorder'
import {
  saveResume,
  saveResumeLink,
  editResumeLink,
  removeResumeLink,
  saveResumeLinksOrder,
} from './actions'

export default async function CurriculoAdminPage() {
  const [resume, links] = await Promise.all([getResume(), getResumeLinks()])

  return (
    <div>
      <h1 className="text-2xl font-semibold">Currículo</h1>
      <p className="mt-2 font-mono text-xs text-steel">
        use nomes de arquivos da pasta do Drive pra imagens, ex:{' '}
        <code className="text-signal">![foto](minha-foto.jpg)</code> — veja a aba Imagens
      </p>
      <ToastForm
        action={saveResume}
        successMessage="Currículo salvo"
        className="mt-4 flex max-w-2xl flex-col gap-4"
      >
        <Textarea name="content_md" defaultValue={resume} rows={20} className="font-mono text-sm" />
        <Button type="submit" className="w-fit">
          Salvar
        </Button>
      </ToastForm>

      <h2 className="mt-10 text-lg font-semibold">Links</h2>
      <p className="mt-2 font-mono text-xs text-steel">
        aparecem no currículo do site — arraste pelos pontinhos pra reordenar
      </p>

      <ToastForm
        action={saveResumeLink}
        successMessage="Link adicionado"
        className="mt-4 flex max-w-xl gap-2"
      >
        <Input name="label" placeholder="Texto (ex: Baixar PDF)" required />
        <Input name="url" placeholder="Link" required />
        <Button type="submit">Adicionar</Button>
      </ToastForm>

      <div className="mt-4">
        <LinkListReorder
          links={links}
          editAction={editResumeLink}
          removeAction={removeResumeLink}
          saveOrderAction={saveResumeLinksOrder}
        />
      </div>
    </div>
  )
}
