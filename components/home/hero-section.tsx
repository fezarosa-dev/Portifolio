'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { deviconIconUrl } from '@/lib/devicon'
import { Typewriter } from '@/components/typewriter'
import type { Language } from '@/lib/supabase/queries'

export function HeroSection({
  title,
  subtitle,
  languages,
  whoamiLabel,
}: {
  title: string
  subtitle: string
  languages: Language[]
  whoamiLabel: string
}) {
  // estimativa generosa (inclui possíveis erros de digitação) pra garantir que
  // as tags só apareçam depois que a digitação do subtítulo já tiver terminado
  const tagsDelay = 0.6 + subtitle.length * 0.09 + 0.4

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-sm text-signal"
      >
        {whoamiLabel}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-5xl font-medium tracking-tight sm:text-7xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-4 max-w-xl text-xl text-steel"
      >
        <Typewriter text={subtitle} startDelay={600} />
      </motion.p>
      {languages.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: tagsDelay, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {languages.map((lang) => (
            <li key={lang.id}>
              <Link
                href={`/projetos?tech=${lang.id}`}
                title={`Ver projetos com ${lang.name}`}
                className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 font-mono text-xs text-steel transition-colors hover:border-signal hover:text-signal"
              >
                {lang.devicon_slug && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={deviconIconUrl(lang.devicon_slug, lang.devicon_variant ?? 'plain')}
                    alt=""
                    className="h-3.5 w-3.5"
                  />
                )}
                {lang.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </section>
  )
}
