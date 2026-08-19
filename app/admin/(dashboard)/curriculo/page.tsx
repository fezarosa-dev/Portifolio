import { getResume } from '@/lib/supabase/queries'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { saveResume } from './actions'

export default async function CurriculoAdminPage() {
  const resume = await getResume()

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
    </div>
  )
}
