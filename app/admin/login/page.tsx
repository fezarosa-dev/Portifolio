'use client'

import { useActionState } from 'react'
import { signIn } from './actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, { error: '' })

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-lg border border-hairline bg-card p-8">
        <p className="font-mono text-xs text-signal">// admin</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight">Login</h1>
        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="mt-2">
            Entrar
          </Button>
        </form>
      </div>
    </main>
  )
}
