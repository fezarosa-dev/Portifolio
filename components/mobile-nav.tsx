'use client'

import { useState } from 'react'
import Link from 'next/link'

export function MobileNav({
  links,
  openLabel,
  closeLabel,
}: {
  links: { href: string; label: string }[]
  openLabel: string
  closeLabel: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-5 bg-foreground transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`}
        />
        <span className={`h-px w-5 bg-foreground transition-opacity ${open ? 'opacity-0' : ''}`} />
        <span
          className={`h-px w-5 bg-foreground transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
        />
      </button>

      {open && (
        <ul className="absolute inset-x-0 top-full flex flex-col border-b border-hairline bg-background px-6 py-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-hairline last:border-b-0">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-foreground/80 hover:text-signal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
