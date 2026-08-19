'use client'

import { useActionState } from 'react'
import { signIn } from './actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, { error: '' })

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <Button type="submit">Entrar</Button>
      </form>
    </main>
  )
}
