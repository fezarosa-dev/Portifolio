import type { MetadataRoute } from 'next'
import { getVisibleProjects, getVisibleArticles, getSiteContent } from '@/lib/supabase/queries'

const SITE_URL = 'https://www.zanoni.dev.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles, content] = await Promise.all([
    getVisibleProjects(),
    getVisibleArticles(),
    getSiteContent(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/sobre`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/servicos`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/projetos`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contato`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/curriculo`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  if (content.artigos_ativo !== 'false') {
    staticRoutes.push({ url: `${SITE_URL}/artigos`, changeFrequency: 'weekly', priority: 0.8 })
  }

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.click_mode === 'detail')
    .map((p) => ({
      url: `${SITE_URL}/projetos/${p.id}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const articleRoutes: MetadataRoute.Sitemap =
    content.artigos_ativo !== 'false'
      ? articles.map((a) => ({
          url: `${SITE_URL}/artigos/${a.id}`,
          changeFrequency: 'monthly',
          priority: 0.7,
        }))
      : []

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
