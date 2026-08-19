'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function ContactForm() {
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
    return <p>Mensagem enviada, obrigado pelo contato!</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <Input name="name" placeholder="Seu nome" required />
      <Input name="email" type="email" placeholder="Seu e-mail" required />
      <Textarea name="message" placeholder="Sua mensagem" required rows={5} />
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar'}
      </Button>
      {status === 'error' && <p className="text-sm text-destructive">Erro ao enviar, tente de novo.</p>}
    </form>
  )
}
