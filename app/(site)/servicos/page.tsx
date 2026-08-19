import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { resolveText } from '@/lib/bilingual'
import { Eyebrow } from '@/components/eyebrow'
import { FadeIn } from '@/components/fade-in'

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Serviços de desenvolvimento de software oferecidos por Felipe Zanoni da Rosa.',
}

export default async function ServicosPage() {
  const [content, { dict, locale }] = await Promise.all([getSiteContent(), getDictionary()])
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <FadeIn>
        <Eyebrow>{dict.servicos.eyebrow}</Eyebrow>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{dict.servicos.title}</h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">
          {resolveText(content.servicos_texto ?? '', content.servicos_texto_en, locale)}
        </p>
      </FadeIn>
    </main>
  )
}
