import { getSiteContent } from '@/lib/supabase/queries'
import { Eyebrow } from '@/components/eyebrow'

export default async function SobrePage() {
  const content = await getSiteContent()
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Eyebrow>sobre-mim</Eyebrow>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">Sobre mim</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/90">{content.sobre_texto}</p>
    </main>
  )
}
