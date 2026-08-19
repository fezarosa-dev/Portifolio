'use client'

import { useEffect, useState } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import { LanguageToggle } from '@/components/admin/language-toggle'

type LabeledLink = { id: string; label: string | null; label_en: string | null; url: string }

function GripIcon() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true">
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="2" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="2" cy="14" r="1.5" />
      <circle cx="8" cy="14" r="1.5" />
    </svg>
  )
}

function LinkRow<T extends LabeledLink>({
  link,
  language,
  onDragEnd,
  editAction,
  removeAction,
}: {
  link: T
  language: 'pt' | 'en'
  onDragEnd: () => void
  editAction: (id: string, formData: FormData) => Promise<void>
  removeAction: (id: string) => Promise<void>
}) {
  const dragControls = useDragControls()
  const ptExplicitlyBlank = link.label === ''
  const enExplicitlyBlank = link.label_en === ''

  return (
    <Reorder.Item
      value={link}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.03, boxShadow: '0 10px 24px rgba(0,0,0,0.14)', zIndex: 1 }}
      className="flex items-center gap-2 rounded-md border bg-background px-3 py-2"
    >
      <button
        type="button"
        onPointerDown={(e) => dragControls.start(e)}
        aria-label="Arrastar para reordenar"
        className="shrink-0 cursor-grab touch-none text-steel hover:text-signal active:cursor-grabbing"
      >
        <GripIcon />
      </button>
      <ToastForm
        action={editAction.bind(null, link.id)}
        successMessage="Link atualizado"
        className="flex flex-1 flex-col gap-1"
      >
        <div className="flex gap-2">
          <Input
            name="label"
            defaultValue={link.label ?? ''}
            placeholder="Texto (vazio usa o EN)"
            className={`h-8 ${language === 'en' ? 'hidden' : ''}`}
          />
          <Input
            name="label_en"
            defaultValue={link.label_en ?? ''}
            placeholder="Texto em EN (vazio usa o PT)"
            className={`h-8 ${language === 'pt' ? 'hidden' : ''}`}
          />
          <Input name="url" defaultValue={link.url} placeholder="Link" className="h-8" />
          <Button type="submit" variant="outline" size="sm">
            Salvar
          </Button>
        </div>
        <label className={`flex items-center gap-1.5 font-mono text-xs text-steel ${language === 'en' ? 'hidden' : ''}`}>
          <input type="checkbox" name="label_blank" value="true" defaultChecked={ptExplicitlyBlank} />
          sem texto em PT — não usar o EN no lugar
        </label>
        <label className={`flex items-center gap-1.5 font-mono text-xs text-steel ${language === 'pt' ? 'hidden' : ''}`}>
          <input type="checkbox" name="label_en_blank" value="true" defaultChecked={enExplicitlyBlank} />
          sem tradução — não usar o PT no lugar
        </label>
      </ToastForm>
      <ToastForm action={removeAction.bind(null, link.id)} successMessage="Link removido">
        <button type="submit" className="px-1 text-muted-foreground hover:text-destructive">
          ×
        </button>
      </ToastForm>
    </Reorder.Item>
  )
}

export function LinkListReorder<T extends LabeledLink>({
  links,
  editAction,
  removeAction,
  saveOrderAction,
}: {
  links: T[]
  editAction: (id: string, formData: FormData) => Promise<void>
  removeAction: (id: string) => Promise<void>
  saveOrderAction: (orderedIds: string[]) => Promise<void>
}) {
  const [order, setOrder] = useState(links)
  const [language, setLanguage] = useState<'pt' | 'en'>('pt')

  useEffect(() => {
    setOrder(links)
  }, [links])

  async function handleDragEnd() {
    try {
      await saveOrderAction(order.map((link) => link.id))
    } catch {
      toast.error('Não deu pra salvar a nova ordem. Tenta de novo.')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <LanguageToggle language={language} onChange={setLanguage} />
      <Reorder.Group
        axis="y"
        values={order}
        onReorder={setOrder}
        className="flex max-w-xl flex-col gap-2"
      >
        {order.map((link) => (
          <LinkRow
            key={link.id}
            link={link}
            language={language}
            onDragEnd={handleDragEnd}
            editAction={editAction}
            removeAction={removeAction}
          />
        ))}
      </Reorder.Group>
    </div>
  )
}
