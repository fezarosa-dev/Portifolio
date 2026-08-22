'use client'

// never gonna give this repo up. clique 3x rápido no cachorro dormindo
// (components/mascote.tsx) pra ver isso ao vivo.
import { forwardRef } from 'react'
import { createPortal } from 'react-dom'

export const RickrollPlayer = forwardRef<
  HTMLVideoElement,
  { videoUrl: string; open: boolean; onClose: () => void }
>(function RickrollPlayer({ videoUrl, open, onClose }, ref) {
  return createPortal(
    <div
      className={
        open ? 'fixed inset-0 z-[70] flex items-center justify-center bg-black' : 'hidden'
      }
    >
      <video
        ref={ref}
        src={videoUrl}
        preload="auto"
        controls
        playsInline
        className="h-full w-full object-contain"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
      >
        ×
      </button>
    </div>,
    document.body
  )
})
