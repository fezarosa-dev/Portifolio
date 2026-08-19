import Link from 'next/link'
import { signOut } from '../actions'
import { Button } from '@/components/ui/button'

const TABS = [
  { href: '/admin/projetos', label: 'Projetos' },
  { href: '/admin/linguagens', label: 'Linguagens' },
  { href: '/admin/mensagens', label: 'Mensagens' },
  { href: '/admin/personalizacao', label: 'Personalização' },
  { href: '/admin/curriculo', label: 'Currículo' },
  { href: '/admin/imagens', label: 'Imagens' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b p-4">
        <nav className="flex gap-4">
          {TABS.map((tab) => (
            <Link key={tab.href} href={tab.href} className="text-sm font-medium">
              {tab.label}
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Sair
          </Button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
