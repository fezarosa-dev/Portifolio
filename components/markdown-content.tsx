'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remarkDriveImages } from '@/lib/markdown/remark-drive-images'
import type { DriveImage } from '@/lib/drive'

export function MarkdownContent({
  content,
  driveImages,
}: {
  content: string
  driveImages: DriveImage[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="prose max-w-none break-words prose-headings:font-display prose-headings:tracking-tight prose-a:text-signal prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-hr:border-hairline prose-blockquote:border-signal prose-pre:overflow-x-auto prose-img:mx-auto"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm, [remarkDriveImages, driveImages]]}>
        {content}
      </ReactMarkdown>
    </motion.div>
  )
}
