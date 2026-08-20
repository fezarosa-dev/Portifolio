import Image from 'next/image'

export function Mascote({ ativo }: { ativo: boolean }) {
  if (!ativo) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 !w-fit select-none">
      <div className="absolute -top-3 right-8 rounded-md border border-hairline bg-card px-2 py-1 font-mono text-[10px] text-foreground/80 shadow-sm">
        AUAU
        <span className="absolute -bottom-[5px] right-4 h-2 w-2 rotate-45 border-b border-r border-hairline bg-card" />
      </div>
      <Image
        src="/img/mascote-cachorro.svg"
        alt=""
        aria-hidden
        width={64}
        height={116}
        priority
        className="!h-[116px] !w-16"
      />
    </div>
  )
}
