'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { NavSettings } from '@/components/nav-settings'
import { useReduceMotion } from '@/components/reduce-motion-provider'
import type { Locale } from '@/lib/i18n/dictionaries'

export function MobileNav({
  links,
  openLabel,
  closeLabel,
  settingsLabel,
  initialDark,
  locale,
}: {
  links: { href: string; label: string }[]
  openLabel: string
  closeLabel: string
  settingsLabel: string
  initialDark: boolean
  locale: Locale
}) {
  const [open, setOpen] = useState(false)
  const { enabled: reduceMotion } = useReduceMotion()

  const items = (
    <>
      {links.map((link) => (
        <li key={link.href} className="border-b border-hairline">
          <Link
            href={link.href}
            onClick={() => setOpen(false)}
            className="block py-3 text-foreground/80 hover:text-signal"
          >
            {link.label}
          </Link>
        </li>
      ))}
      <li className="flex justify-end py-3">
        <NavSettings initialDark={initialDark} locale={locale} label={settingsLabel} />
      </li>
    </>
  )

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
          className={`h-px w-5 bg-foreground ${reduceMotion ? '' : 'transition-transform'} ${open ? 'translate-y-[3px] rotate-45' : ''}`}
        />
        <span
          className={`h-px w-5 bg-foreground ${reduceMotion ? '' : 'transition-opacity'} ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`h-px w-5 bg-foreground ${reduceMotion ? '' : 'transition-transform'} ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full flex flex-col border-b border-hairline bg-background px-6 py-2"
          >
            {items}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
