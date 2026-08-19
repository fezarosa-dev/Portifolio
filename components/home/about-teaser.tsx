'use client'

import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/eyebrow'

export function AboutTeaser({ text, eyebrow }: { text: string; eyebrow: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl px-6 py-24"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="mt-4 text-xl leading-relaxed">{text}</p>
    </motion.section>
  )
}
