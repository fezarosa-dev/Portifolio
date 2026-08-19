const LINKS = [
  { href: 'mailto:fezarosa@gmail.com', label: 'e-mail' },
  { href: 'https://github.com/fezarosa-dev', label: 'github' },
  { href: 'https://www.linkedin.com/in/felipe-zanoni/', label: 'linkedin' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 font-mono text-xs text-steel sm:flex-row">
        <p>© {new Date().getFullYear()} Felipe Zanoni da Rosa</p>
        <div className="flex gap-5">
          {LINKS.map((link) => (
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
