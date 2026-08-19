import { listMessages } from '@/lib/supabase/admin-queries'
import { toggleRead, removeMessage } from './actions'

export default async function MensagensPage() {
  const messages = await listMessages()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Mensagens</h1>
      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma mensagem ainda.</p>
      ) : (
        <ul className="flex max-w-2xl flex-col gap-3">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`rounded-lg border p-4 ${msg.read ? 'border-hairline' : 'border-signal'}`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium">
                  {msg.name} <span className="text-steel">— {msg.email}</span>
                </p>
                <p className="shrink-0 font-mono text-xs text-steel">
                  {new Date(msg.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
              <p className="mt-2 text-sm text-foreground/90">{msg.message}</p>
              <div className="mt-3 flex gap-4 font-mono text-xs">
                <form action={toggleRead.bind(null, msg.id, !msg.read)}>
                  <button type="submit" className="text-signal hover:underline">
                    marcar como {msg.read ? 'não lida' : 'lida'}
                  </button>
                </form>
                <form action={removeMessage.bind(null, msg.id)}>
                  <button type="submit" className="text-destructive hover:underline">
                    excluir
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
