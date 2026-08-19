import { getSiteContent, getVisibleProjects, getLanguages } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'
import { HeroSection } from '@/components/home/hero-section'
import { AboutTeaser } from '@/components/home/about-teaser'
import { ProjectsTeaser } from '@/components/home/projects-teaser'

export default async function HomePage() {
  const [content, projects, languages, { dict }] = await Promise.all([
    getSiteContent(),
    getVisibleProjects(),
    getLanguages(),
    getDictionary(),
  ])

  return (
    <>
      <HeroSection
        title={content.hero_title ?? ''}
        subtitle={content.hero_subtitle ?? ''}
        languages={languages}
        whoamiLabel={dict.home.whoami}
      />
      <AboutTeaser text={content.sobre_texto ?? ''} eyebrow={dict.home.aboutEyebrow} />
      <ProjectsTeaser
        projects={projects}
        eyebrow={dict.home.projectsEyebrow}
        heading={dict.home.projectsHeading}
        seeAll={dict.home.seeAll}
        withLabel={dict.projetos.with}
      />
    </>
  )
}
