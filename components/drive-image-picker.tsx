'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type DriveImage = { id: string; name: string; thumbnailLink: string }

export function DriveImagePicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (name: string) => void
}) {
  const [images, setImages] = useState<DriveImage[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/drive/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else setImages(data.images)
      })
  }, [])

  if (error) return <p className="text-sm text-destructive">{error}</p>

  return (
    <div className="grid grid-cols-4 gap-3">
      {images.map((image) => (
        <button
          type="button"
          key={image.id}
          onClick={() => onChange(image.name)}
          className={`rounded border p-1 text-left ${value === image.name ? 'border-primary' : ''}`}
        >
          <Image
            src={`/api/drive-image/${image.id}`}
            alt={image.name}
            width={80}
            height={80}
            className="h-20 w-full object-cover"
            unoptimized
          />
          <span className="block truncate text-xs">{image.name}</span>
        </button>
      ))}
    </div>
  )
}
