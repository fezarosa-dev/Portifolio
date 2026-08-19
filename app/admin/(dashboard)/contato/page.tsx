import { getContactLinks } from '@/lib/supabase/queries'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { LinkListReorder } from '@/components/admin/link-list-reorder'
import { saveContactLink, editContactLink, removeContactLink, saveContactLinksOrder } from './actions'

export default async function AdminContatoPage() {
  const links = await getContactLinks()

  return (
    <div>
      <h1 className="text-2xl font-semibold">Contato</h1>
      <p className="mt-2 font-mono text-xs text-steel">
        cada item vira um jeito de te encontrar na página de Contato — texto e o link (e-mail use{' '}
        <code className="text-signal">mailto:</code>, telefone use{' '}
        <code className="text-signal">tel:</code>) — arraste pelos pontinhos pra reordenar
      </p>

      <ToastForm
        action={saveContactLink}
        successMessage="Contato adicionado"
        className="mt-4 flex max-w-xl gap-2"
      >
        <Input name="label" placeholder="Texto (ex: E-mail)" required />
        <Input name="url" placeholder="Link (ex: mailto:voce@email.com)" required />
        <Button type="submit">Adicionar</Button>
      </ToastForm>

      <div className="mt-4">
        <LinkListReorder
          links={links}
          editAction={editContactLink}
          removeAction={removeContactLink}
          saveOrderAction={saveContactLinksOrder}
        />
      </div>
    </div>
  )
}
