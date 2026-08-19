import { getSiteContent } from '@/lib/supabase/queries'

export default async function SobrePage() {
  const content = await getSiteContent()
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Sobre mim</h1>
      <p className="text-lg">{content.sobre_texto}</p>
    </main>
  )
}
