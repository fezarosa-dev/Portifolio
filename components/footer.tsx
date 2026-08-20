import { getSiteContent } from '@/lib/supabase/queries'
import { getDictionary } from '@/lib/i18n'

export async function Footer() {
  const [content, { dict }] = await Promise.all([getSiteContent(), getDictionary()])
  const links = [
    content.contato_email && { href: `mailto:${content.contato_email}`, label: dict.footer.email },
    content.link_github && { href: content.link_github, label: dict.footer.github },
    content.link_linkedin && { href: content.link_linkedin, label: dict.footer.linkedin },
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
      {content.mascote_ativo === 'true' && (
        <p className="mt-4 text-center font-mono text-[11px] text-steel/70">{"// don't wake the dog."}</p>
      )}
    </footer>
  )
}
