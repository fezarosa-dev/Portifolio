'use client'

import { motion } from 'framer-motion'

const STACK = ['Python', 'Linux', 'Docker', 'ROS', 'TypeScript']

export function HeroSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-sm text-signal"
      >
        $ whoami
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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 max-w-xl text-xl text-steel"
      >
        {subtitle}
      </motion.p>
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 flex flex-wrap justify-center gap-2"
      >
        {STACK.map((item) => (
          <li
            key={item}
            className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-steel"
          >
            {item}
          </li>
        ))}
      </motion.ul>
    </section>
  )
}
