'use client'

import { motion } from 'framer-motion'

export function HeroSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl font-semibold"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 text-xl text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    </section>
  )
}
