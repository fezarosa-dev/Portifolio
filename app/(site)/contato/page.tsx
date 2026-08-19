import { getSiteContent } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { ContactForm } from './contact-form'
import { Eyebrow } from '@/components/eyebrow'
import { FadeIn } from '@/components/fade-in'

export default async function ContatoPage() {
  const [content, { dict }] = await Promise.all([getSiteContent(), getDictionary()])
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <FadeIn>
        <Eyebrow>{dict.contato.eyebrow}</Eyebrow>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{dict.contato.title}</h1>
        <p className="mt-4 font-mono text-sm text-steel">
          {content.contato_email} {content.contato_telefone}
        </p>
      </FadeIn>
      <FadeIn delay={0.1} className="mt-10">
        <ContactForm dict={dict.contato} />
      </FadeIn>
    </main>
  )
}
