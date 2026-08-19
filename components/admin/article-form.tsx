'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import type { Article } from '@/lib/supabase/queries'

export function ArticleForm({
  article,
  action,
}: {
  article: Article | null
  action: (formData: FormData) => Promise<void>
}) {
  const router = useRouter()
  const [visible, setVisible] = useState(article?.visible ?? true)

  async function handleSubmit(formData: FormData) {
    try {
      await action(formData)
      toast.success('Artigo salvo')
      router.push('/admin/artigos')
    } catch {
      toast.error('Não deu pra salvar o artigo. Tenta de novo.')
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      {article && <input type="hidden" name="id" value={article.id} />}

      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" defaultValue={article?.title} required />
      </div>

      <div>
        <Label htmlFor="summary">Resumo</Label>
        <Textarea id="summary" name="summary" defaultValue={article?.summary} rows={2} />
      </div>

      <div>
        <Label htmlFor="content_md">Conteúdo (Markdown)</Label>
        <Textarea id="content_md" name="content_md" defaultValue={article?.content_md} rows={16} />
      </div>

      <div>
        <Label htmlFor="position">Ordem</Label>
        <Input id="position" name="position" type="number" defaultValue={article?.position ?? 0} />
      </div>

      <div className="flex items-center gap-2">
        <Switch id="visible" checked={visible} onCheckedChange={setVisible} />
        <input type="hidden" name="visible" value={visible ? 'true' : 'false'} />
        <Label htmlFor="visible">Visível no site</Label>
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  )
}
