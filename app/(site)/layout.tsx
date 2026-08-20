import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Mascote } from '@/components/mascote'
import { getSiteContent } from '@/lib/supabase/queries'
import { getLocale } from '@/lib/i18n'

const SITE_NAME = 'Felipe Zanoni da Rosa'
const SITE_URL = 'https://www.zanoni.dev.br'

const SEO_BY_LOCALE = {
  pt: {
    title: { default: `${SITE_NAME} — Portfólio`, template: `%s — ${SITE_NAME}` },
    description:
      'Portfólio de Felipe Zanoni da Rosa, desenvolvedor de software full stack — projetos, artigos técnicos, currículo e contato.',
    keywords: [
      'Felipe Zanoni da Rosa',
      'desenvolvedor de software',
      'engenheiro de software',
      'portfólio de desenvolvedor',
      'desenvolvedor full stack',
      'projetos de software',
      'programador Brasil',
    ],
    ogLocale: 'pt_BR',
  },
  en: {
    title: { default: `${SITE_NAME} — Portfolio`, template: `%s — ${SITE_NAME}` },
    description:
      'Portfolio of Felipe Zanoni da Rosa, full stack software developer — projects, technical articles, resume and contact.',
    keywords: [
      'Felipe Zanoni da Rosa',
      'software developer',
      'software engineer',
      'developer portfolio',
      'full stack developer',
      'software projects',
    ],
    ogLocale: 'en_US',
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getSiteContent(), getLocale()])
  const seo = SEO_BY_LOCALE[locale]

  return {
    title: seo.title,
    description: seo.description,
    keywords: [...seo.keywords],
    openGraph: {
      type: 'website',
      locale: seo.ogLocale,
      url: SITE_URL,
      siteName: SITE_NAME,
      title: seo.title.default,
      description: seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title.default,
      description: seo.description,
    },
    ...(content.site_icon ? { icons: { icon: '/api/site-icon' } } : {}),
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent()

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <Mascote ativo={content.mascote_ativo === 'true'} />
    </>
  )
}
