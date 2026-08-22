'use client'

import { createPortal } from 'react-dom'

export function RickrollPlayer({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black">
      <video src={videoUrl} autoPlay controls playsInline className="h-full w-full object-contain" />
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
}
