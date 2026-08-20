'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export function MascoteAtivoToggle({
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
      toast.success(next ? 'Mascote ativado no site' : 'Mascote desativado no site')
    } catch {
      setChecked(!next)
      toast.error('Não deu pra salvar. Tenta de novo.')
    }
  }

  return (
    <>
      <Switch id="mascote_ativo" checked={checked} onCheckedChange={handleChange} />
      <Label htmlFor="mascote_ativo">Mostrar mascote no site</Label>
    </>
  )
}
