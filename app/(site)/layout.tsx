import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { getSiteContent } from '@/lib/supabase/queries'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return content.site_icon ? { icons: { icon: '/api/site-icon' } } : {}
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
