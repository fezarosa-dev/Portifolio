import type { Root, Image } from 'mdast'
import { visit } from 'unist-util-visit'
import type { DriveImage } from '@/lib/drive'

export function remarkDriveImages(images: DriveImage[]) {
  const byName = new Map(images.map((img) => [img.name, img.id]))

  return (tree: Root) => {
    visit(tree, 'image', (node: Image) => {
      const isAbsoluteUrl = /^https?:\/\//i.test(node.url)
      if (!isAbsoluteUrl) {
        const fileId = byName.get(node.url)
        node.url = fileId ? `/api/drive-image/${fileId}` : '/window.svg'
      }
    })
  }
}
