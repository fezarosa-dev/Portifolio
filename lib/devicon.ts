import icons from './devicon-icons.json' with { type: 'json' }

type DeviconEntry = { name: string; altnames: string[]; slug: string }

export function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/[\s\-_.]/g, '')
}

export function findDeviconIcon(name: string): { slug: string; variant: string | null } | null {
  const target = normalize(name)
  if (!target) return null

  const entry = (icons as DeviconEntry[]).find(
    (icon) => normalize(icon.name) === target || icon.altnames.some((alt) => normalize(alt) === target)
  )

  return entry ? { slug: entry.slug, variant: null } : null
}

export function deviconIconUrl(slug: string): string {
  return `https://cdn.jsdelivr.net/gh/vorillaz/devicons/packages/core/export-files/icons/${slug}.svg`
}
