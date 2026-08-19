'use client'

import { useEffect, useState } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastForm } from '@/components/admin/toast-form'
import type { ResumeLink } from '@/lib/supabase/queries'

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

function ResumeLinkRow({
  link,
  onDragEnd,
  editAction,
  removeAction,
}: {
  link: ResumeLink
  onDragEnd: () => void
  editAction: (id: string, formData: FormData) => Promise<void>
  removeAction: (id: string) => Promise<void>
}) {
  const dragControls = useDragControls()

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
        className="flex flex-1 gap-2"
      >
        <Input name="label" defaultValue={link.label} placeholder="Texto" className="h-8" />
        <Input name="url" defaultValue={link.url} placeholder="Link" className="h-8" />
        <Button type="submit" variant="outline" size="sm">
          Salvar
        </Button>
      </ToastForm>
      <ToastForm action={removeAction.bind(null, link.id)} successMessage="Link removido">
        <button type="submit" className="px-1 text-muted-foreground hover:text-destructive">
          ×
        </button>
      </ToastForm>
    </Reorder.Item>
  )
}

export function ResumeLinksReorderList({
  links,
  editAction,
  removeAction,
  saveOrderAction,
}: {
  links: ResumeLink[]
  editAction: (id: string, formData: FormData) => Promise<void>
  removeAction: (id: string) => Promise<void>
  saveOrderAction: (orderedIds: string[]) => Promise<void>
}) {
  const [order, setOrder] = useState(links)

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
    <Reorder.Group
      axis="y"
      values={order}
      onReorder={setOrder}
      className="flex max-w-xl flex-col gap-2"
    >
      {order.map((link) => (
        <ResumeLinkRow
          key={link.id}
          link={link}
          onDragEnd={handleDragEnd}
          editAction={editAction}
          removeAction={removeAction}
        />
      ))}
    </Reorder.Group>
  )
}
