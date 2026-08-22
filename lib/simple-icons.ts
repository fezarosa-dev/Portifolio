import icons from './simple-icons.json' with { type: 'json' }
import { normalize } from './devicon.ts'

type SimpleIconEntry = { name: string; altnames: string[]; slug: string }

export function findSimpleIcon(name: string): { slug: string } | null {
  const target = normalize(name)
  if (!target) return null

  const entry = (icons as SimpleIconEntry[]).find(
    (icon) => normalize(icon.name) === target || icon.altnames.some((alt) => normalize(alt) === target)
  )

  return entry ? { slug: entry.slug } : null
}
