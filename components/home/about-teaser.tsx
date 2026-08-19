'use client'

import { motion } from 'framer-motion'

export function AboutTeaser({ text }: { text: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl px-6 py-24 text-lg"
    >
      {text}
    </motion.section>
  )
}
