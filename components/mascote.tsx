import Image from 'next/image'

export function Mascote({ ativo }: { ativo: boolean }) {
  if (!ativo) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 !w-fit select-none">
      <Image
        src="/img/mascote-cachorro.svg"
        alt=""
        aria-hidden
        width={64}
        height={116}
        priority
        className="!h-[116px] !w-16"
      />
      <div className="absolute top-2 right-8 rounded-2xl border border-hairline bg-card px-2 py-1 font-mono text-[10px] text-foreground/80 shadow-sm">
        ZZZZ
      </div>
      <span className="absolute top-9 right-9 h-2 w-2 rounded-full border border-hairline bg-card" />
      <span className="absolute top-6 right-7 h-1.5 w-1.5 rounded-full border border-hairline bg-card" />
    </div>
  )
}
