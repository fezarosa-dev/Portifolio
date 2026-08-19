import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre mim' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato', label: 'Contato' },
  { href: '/curriculo', label: 'Currículo' },
]

export function Nav() {
  return (
    <div className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur">
      <div className="hidden items-center gap-2 border-b border-hairline px-6 py-1.5 font-mono text-[11px] text-steel sm:flex">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-status" aria-hidden />
        disponível para novos projetos — Itajubá, BR
      </div>
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          fzr<span className="text-signal">.</span>dev
        </Link>
        <ul className="flex gap-5 text-sm sm:gap-7">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-foreground/80 transition-colors hover:text-signal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
