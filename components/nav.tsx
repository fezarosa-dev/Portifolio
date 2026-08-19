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
    <nav className="flex items-center justify-between px-8 py-6">
      <Link href="/" className="text-xl font-semibold">
        Portfólio
      </Link>
      <ul className="flex gap-6 text-sm">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
