import type { Metadata } from 'next'
import { getSiteContent, getVisibleProjects, getLanguages } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { HeroSection } from '@/components/home/hero-section'
import { AboutTeaser } from '@/components/home/about-teaser'
import { ProjectsTeaser } from '@/components/home/projects-teaser'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felipe Zanoni da Rosa',
  url: 'https://www.zanoni.dev.br',
  jobTitle: 'Software Engineer',
  sameAs: ['https://github.com/fezarosa-dev', 'https://www.linkedin.com/in/felipe-zanoni/'],
}

export default async function HomePage() {
  const [content, projects, languages, { dict }] = await Promise.all([
    getSiteContent(),
    getVisibleProjects(),
    getLanguages(),
    getDictionary(),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSection
        title={content.hero_title ?? ''}
        subtitle={content.hero_subtitle ?? ''}
        languages={languages}
        whoamiLabel={dict.home.whoami}
      />
      <AboutTeaser text={content.sobre_texto ?? ''} eyebrow={dict.home.aboutEyebrow} />
      <ProjectsTeaser
        projects={projects.filter((p) => p.show_on_home)}
        eyebrow={dict.home.projectsEyebrow}
        heading={dict.home.projectsHeading}
        seeAll={dict.home.seeAll}
        withLabel={dict.projetos.with}
      />
    </>
  )
}
