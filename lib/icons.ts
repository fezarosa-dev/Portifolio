import { findDeviconIcon, deviconIconUrl } from './devicon.ts'
import { findSimpleIcon } from './simple-icons.ts'

export type IconSource = 'devicon' | 'simpleicon' | 'custom'

export function resolveIcon(
  name: string
): { slug: string; variant: string | null; source: IconSource } | null {
  const devicon = findDeviconIcon(name)
  if (devicon) return { slug: devicon.slug, variant: devicon.variant, source: 'devicon' }

  const simpleIcon = findSimpleIcon(name)
  if (simpleIcon) return { slug: simpleIcon.slug, variant: null, source: 'simpleicon' }

  return null
}

export function iconUrl(slug: string, variant: string, source?: string | null): string {
  if (source === 'custom') return slug
  return source === 'simpleicon' ? `https://cdn.simpleicons.org/${slug}` : deviconIconUrl(slug)
}
