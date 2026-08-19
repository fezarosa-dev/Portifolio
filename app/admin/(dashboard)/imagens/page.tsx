'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type DriveImage = { id: string; name: string; thumbnailLink: string }

export default function ImagensPage() {
  const [images, setImages] = useState<DriveImage[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/drive/list')
      .then((res) => res.json())
      .then((data) => (data.error ? setError(data.error) : setImages(data.images)))
  }, [])

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Imagens</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Imagens da pasta do Google Drive configurada em Personalização. Use o nome exato de cada uma nos seus textos em Markdown.
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="rounded border p-2">
            <Image
              src={`/api/drive-image/${image.id}`}
              alt={image.name}
              width={160}
              height={160}
              className="h-32 w-full object-cover"
              unoptimized
            />
            <p className="mt-2 truncate text-xs">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
