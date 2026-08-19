import { getSiteContent, getVisibleProjects, getLanguages } from '@/lib/supabase/queries'
import { HeroSection } from '@/components/home/hero-section'
import { AboutTeaser } from '@/components/home/about-teaser'
import { ProjectsTeaser } from '@/components/home/projects-teaser'

export default async function HomePage() {
  const [content, projects, languages] = await Promise.all([
    getSiteContent(),
    getVisibleProjects(),
    getLanguages(),
  ])

  return (
    <>
      <HeroSection
        title={content.hero_title ?? ''}
        subtitle={content.hero_subtitle ?? ''}
        languages={languages}
      />
      <AboutTeaser text={content.sobre_texto ?? ''} />
      <ProjectsTeaser projects={projects} />
    </>
  )
}
