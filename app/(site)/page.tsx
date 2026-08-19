import { getSiteContent, getVisibleProjects } from '@/lib/supabase/queries'
import { HeroSection } from '@/components/home/hero-section'
import { AboutTeaser } from '@/components/home/about-teaser'
import { ProjectsTeaser } from '@/components/home/projects-teaser'

export default async function HomePage() {
  const [content, projects] = await Promise.all([getSiteContent(), getVisibleProjects()])

  return (
    <>
      <HeroSection title={content.hero_title ?? ''} subtitle={content.hero_subtitle ?? ''} />
      <AboutTeaser text={content.sobre_texto ?? ''} />
      <ProjectsTeaser projects={projects} />
    </>
  )
}
