import { NextResponse } from 'next/server'
import { insertMessage } from '@/lib/supabase/queries'
import { notifyNewMessage } from '@/lib/notify'

export async function POST(request: Request) {
  const body = await request.json()
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  await insertMessage({ name, email, message })
  await notifyNewMessage(name, email, message)
  return NextResponse.json({ ok: true })
}
