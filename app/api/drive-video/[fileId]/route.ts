import { NextResponse } from 'next/server'
import { fetchDriveFile } from '@/lib/drive'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params
  const range = request.headers.get('range')
  const res = await fetchDriveFile(fileId, range)

  if (!res.ok || !res.body) {
    return NextResponse.json({ error: 'Vídeo não encontrado' }, { status: 404 })
  }

  const headers = new Headers({
    'Content-Type': res.headers.get('content-type') ?? 'video/mp4',
    'Cache-Control': 'public, max-age=3600',
    'Accept-Ranges': 'bytes',
  })
  const contentRange = res.headers.get('content-range')
  const contentLength = res.headers.get('content-length')
  if (contentRange) headers.set('Content-Range', contentRange)
  if (contentLength) headers.set('Content-Length', contentLength)

  return new NextResponse(res.body, { status: res.status, headers })
}
