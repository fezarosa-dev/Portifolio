import type { Root } from 'mdast'
import type { DriveImage } from '@/lib/drive'

export function remarkDriveImages(images: DriveImage[]) {
  const byName = new Map(images.map((img) => [img.name, img.id]))

  return (tree: Root) => {
    const walk = (node: any): void => {
      if (!node) return
      if (node.type === 'image') {
        const isAbsoluteUrl = /^https?:\/\//i.test(node.url)
        if (!isAbsoluteUrl) {
          const fileId = byName.get(node.url)
          node.url = fileId ? `/api/drive-image/${fileId}` : '/window.svg'
        }
      }
      if (node.children) {
        node.children.forEach(walk)
      }
    }

    walk(tree)
  }
}
