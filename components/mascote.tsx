import Image from 'next/image'

export function Mascote({ ativo }: { ativo: boolean }) {
  if (!ativo) return null

  return (
    <Image
      src="/img/mascote-cachorro.svg"
      alt=""
      aria-hidden
      width={64}
      height={116}
      priority
      className="pointer-events-none fixed bottom-4 left-4 z-30 !w-16 !h-[116px] select-none"
    />
  )
}
