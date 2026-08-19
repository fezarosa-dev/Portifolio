import { NextResponse } from 'next/server'
import { fetchDriveImage } from '@/lib/drive'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params
  const res = await fetchDriveImage(fileId)

  if (!res.ok || !res.body) {
    return NextResponse.json({ error: 'Imagem não encontrada' }, { status: 404 })
  }

  return new NextResponse(res.body, {
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
