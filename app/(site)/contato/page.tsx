import { getSiteContent } from '@/lib/supabase/queries'
import { ContactForm } from './contact-form'

export default async function ContatoPage() {
  const content = await getSiteContent()
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Contato</h1>
      <p className="mb-8 text-muted-foreground">
        {content.contato_email} {content.contato_telefone}
      </p>
      <ContactForm />
    </main>
  )
}
