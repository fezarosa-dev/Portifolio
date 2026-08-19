import { getSiteContent } from '@/lib/supabase/queries'

export async function Footer() {
  const content = await getSiteContent()
  const links = [
    content.contato_email && { href: `mailto:${content.contato_email}`, label: 'e-mail' },
    content.link_github && { href: content.link_github, label: 'github' },
    content.link_linkedin && { href: content.link_linkedin, label: 'linkedin' },
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <footer className="mt-auto border-t border-hairline px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 font-mono text-xs text-steel sm:flex-row">
        <p>© {new Date().getFullYear()} Felipe Zanoni da Rosa</p>
        <div className="flex gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-colors hover:text-signal"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
