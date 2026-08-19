import Link from 'next/link'
import { getSiteContent } from '@/lib/supabase/queries'

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre mim' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato', label: 'Contato' },
  { href: '/curriculo', label: 'Currículo' },
]

const STATUS_COLORS: Record<string, string> = {
  green: '#2FAE66',
  amber: '#F2661D',
  red: '#E5484D',
  gray: '#6B7280',
}

export async function Nav() {
  const content = await getSiteContent()
  const statusText = content.status_text || 'disponível para novos projetos'
  const statusColor = STATUS_COLORS[content.status_color] ?? STATUS_COLORS.green

  return (
    <div className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur">
      <div className="hidden items-center gap-2 border-b border-hairline px-6 py-1.5 font-mono text-[11px] text-steel sm:flex">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: statusColor }}
          aria-hidden
        />
        {statusText}
      </div>
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          zanoni<span className="text-signal">.dev.br</span>
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
