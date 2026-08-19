import { getSiteContent } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { Eyebrow } from '@/components/eyebrow'

export default async function ServicosPage() {
  const [content, { dict }] = await Promise.all([getSiteContent(), getDictionary()])
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Eyebrow>{dict.servicos.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">{dict.servicos.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/90">{content.servicos_texto}</p>
    </main>
  )
}
