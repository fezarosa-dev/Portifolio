'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export function ArtigosAtivoToggle({
  ativo,
  action,
}: {
  ativo: boolean
  action: (ativo: boolean) => Promise<void>
}) {
  const [checked, setChecked] = useState(ativo)

  async function handleChange(next: boolean) {
    setChecked(next)
    try {
      await action(next)
      toast.success(next ? 'Artigos ativado no menu' : 'Artigos removido do menu')
    } catch {
      setChecked(!next)
      toast.error('Não deu pra salvar. Tenta de novo.')
    }
  }

  return (
    <>
      <Switch id="artigos_ativo" checked={checked} onCheckedChange={handleChange} />
      <Label htmlFor="artigos_ativo">Mostrar &quot;Artigos&quot; no menu do site</Label>
    </>
  )
}
