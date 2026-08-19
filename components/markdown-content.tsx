'use client'

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
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm, [remarkDriveImages, driveImages]]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
