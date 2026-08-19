import { listMessages } from '@/lib/supabase/admin-queries'
import { toggleRead, removeMessage } from './actions'

export default async function MensagensPage() {
  const messages = await listMessages()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Mensagens</h1>
      <ul className="flex flex-col gap-4">
        {messages.map((msg) => (
          <li key={msg.id} className={`rounded border p-4 ${msg.read ? '' : 'border-primary'}`}>
            <p className="font-medium">{msg.name} — {msg.email}</p>
            <p className="mt-1 text-sm">{msg.message}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(msg.created_at).toLocaleString('pt-BR')}
            </p>
            <div className="mt-2 flex gap-3">
              <form action={toggleRead.bind(null, msg.id, !msg.read)}>
                <button type="submit" className="text-sm underline">
                  Marcar como {msg.read ? 'não lida' : 'lida'}
                </button>
              </form>
              <form action={removeMessage.bind(null, msg.id)}>
                <button type="submit" className="text-sm text-destructive underline">
                  Excluir
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
