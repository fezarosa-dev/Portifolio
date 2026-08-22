'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const VIEWPORT = 220
const OUTPUT_SIZE = 256

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function IconUpload({
  value,
  onChange,
}: {
  value: string
  onChange: (dataUrl: string) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [source, setSource] = useState<string | null>(null)
  const [baseScale, setBaseScale] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })
  const dragState = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number } | null>(
    null
  )

  function clampOffset(x: number, y: number, scale: number, naturalWidth: number, naturalHeight: number) {
    const width = naturalWidth * scale
    const height = naturalHeight * scale
    return {
      x: clamp(x, VIEWPORT - width, 0),
      y: clamp(y, VIEWPORT - height, 0),
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setSource(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleImageLoad() {
    const img = imgRef.current
    if (!img) return
    const scale = Math.max(VIEWPORT / img.naturalWidth, VIEWPORT / img.naturalHeight)
    setBaseScale(scale)
    setZoom(1)
    setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight })
    setOffset(
      clampOffset(
        (VIEWPORT - img.naturalWidth * scale) / 2,
        (VIEWPORT - img.naturalHeight * scale) / 2,
        scale,
        img.naturalWidth,
        img.naturalHeight
      )
    )
  }

  function handleZoomChange(nextZoom: number) {
    const img = imgRef.current
    if (!img) return
    const scale = baseScale * nextZoom
    setZoom(nextZoom)
    setOffset((prev) => clampOffset(prev.x, prev.y, scale, img.naturalWidth, img.naturalHeight))
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!imgRef.current) return
    ;(e.target as Element).setPointerCapture(e.pointerId)
    dragState.current = { startX: e.clientX, startY: e.clientY, offsetX: offset.x, offsetY: offset.y }
  }

  function handlePointerMove(e: React.PointerEvent) {
    const drag = dragState.current
    const img = imgRef.current
    if (!drag || !img) return
    const scale = baseScale * zoom
    setOffset(
      clampOffset(
        drag.offsetX + (e.clientX - drag.startX),
        drag.offsetY + (e.clientY - drag.startY),
        scale,
        img.naturalWidth,
        img.naturalHeight
      )
    )
  }

  function handlePointerUp() {
    dragState.current = null
  }

  function confirmCrop() {
    const img = imgRef.current
    if (!img) return
    const scale = baseScale * zoom
    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_SIZE
    canvas.height = OUTPUT_SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sx = -offset.x / scale
    const sy = -offset.y / scale
    const sSize = VIEWPORT / scale
    ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)

    onChange(canvas.toDataURL('image/png'))
    setSource(null)
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {source ? (
        <div className="flex flex-col gap-3">
          <div
            ref={containerRef}
            className="relative touch-none overflow-hidden rounded-full border border-hairline bg-card"
            style={{ width: VIEWPORT, height: VIEWPORT, cursor: 'grab' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={source}
              alt=""
              draggable={false}
              onLoad={handleImageLoad}
              style={{
                position: 'absolute',
                left: offset.x,
                top: offset.y,
                width: naturalSize.width ? naturalSize.width * baseScale * zoom : undefined,
                height: naturalSize.height ? naturalSize.height * baseScale * zoom : undefined,
                maxWidth: 'none',
              }}
            />
          </div>
          <div className="flex max-w-[220px] items-center gap-2">
            <span className="font-mono text-xs text-steel">zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => handleZoomChange(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={confirmCrop}>
              Usar esta imagem
            </Button>
            <Button type="button" variant="outline" onClick={() => setSource(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Ícone atual" className="h-14 w-14 rounded-full border border-hairline" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-hairline text-xs text-steel">
              sem ícone
            </div>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              {value ? 'Trocar imagem' : 'Escolher imagem'}
            </Button>
            {value && (
              <Button type="button" variant="outline" onClick={() => onChange('')}>
                Remover
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
