'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Eyebrow } from '@/components/eyebrow'
import { useReduceMotion } from '@/components/reduce-motion-provider'

export function AboutTeaser({ text, eyebrow }: { text: string; eyebrow: string }) {
  const { enabled: reduceMotion } = useReduceMotion()
  const content = (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="prose dark:prose-invert mt-4 max-w-none text-xl leading-relaxed prose-a:text-signal prose-a:no-underline hover:prose-a:underline">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </>
  )

  if (reduceMotion) {
    return <section className="mx-auto max-w-2xl px-6 py-24">{content}</section>
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl px-6 py-24"
    >
      {content}
    </motion.section>
  )
}
