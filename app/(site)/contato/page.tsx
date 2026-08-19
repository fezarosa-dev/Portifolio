import { getSiteContent } from '@/lib/supabase/queries'
import { ContactForm } from './contact-form'
import { Eyebrow } from '@/components/eyebrow'

export default async function ContatoPage() {
  const content = await getSiteContent()
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Eyebrow>contato</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">Vamos conversar</h1>
      <p className="mt-4 font-mono text-sm text-steel">
        {content.contato_email} {content.contato_telefone}
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </main>
  )
}
