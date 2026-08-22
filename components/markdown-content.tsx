'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remarkDriveImages } from '@/lib/markdown/remark-drive-images'
import { useReduceMotion } from '@/components/reduce-motion-provider'
import type { DriveImage } from '@/lib/drive'

const CLASS_NAME =
  'prose dark:prose-invert max-w-none break-words prose-headings:font-display prose-headings:tracking-tight prose-a:text-signal prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-hr:border-hairline prose-blockquote:border-signal prose-pre:overflow-x-auto prose-img:mx-auto'

export function MarkdownContent({
  content,
  driveImages,
}: {
  content: string
  driveImages: DriveImage[]
}) {
  const { enabled: reduceMotion } = useReduceMotion()
  const markdown = (
    <ReactMarkdown remarkPlugins={[remarkGfm, [remarkDriveImages, driveImages]]}>{content}</ReactMarkdown>
  )

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={CLASS_NAME}
    >
      {markdown}
    </motion.div>
  )
}
