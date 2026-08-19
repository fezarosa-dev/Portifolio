'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/i18n'

export function ContactForm({ dict }: { dict: Dictionary['contato'] }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    })
    setStatus(res.ok ? 'sent' : 'error')
    if (res.ok) e.currentTarget.reset()
  }

  if (status === 'sent') {
    return <p className="font-mono text-sm text-status">{dict.sent}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <Input name="name" placeholder={dict.namePlaceholder} required />
      <Input name="email" type="email" placeholder={dict.emailPlaceholder} required />
      <Textarea name="message" placeholder={dict.messagePlaceholder} required rows={5} />
      <Button type="submit" disabled={status === 'sending'} className="w-fit">
        {status === 'sending' ? dict.sending : dict.send}
      </Button>
      {status === 'error' && <p className="font-mono text-sm text-destructive">{dict.error}</p>}
    </form>
  )
}
