import icons from './devicon-icons.json' with { type: 'json' }

type DeviconEntry = { name: string; altnames: string[]; variant: string }

function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/[\s\-_.]/g, '')
}

export function findDeviconIcon(name: string): { slug: string; variant: string } | null {
  const target = normalize(name)
  if (!target) return null

  const entry = (icons as DeviconEntry[]).find(
    (icon) => normalize(icon.name) === target || icon.altnames.some((alt) => normalize(alt) === target)
  )

  return entry ? { slug: entry.name, variant: entry.variant } : null
}

export function deviconIconUrl(slug: string, variant: string): string {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`
}
