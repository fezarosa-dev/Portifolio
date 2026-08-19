import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listDriveImages, parseDriveFolderId } from '@/lib/drive'

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', 'drive_folder_url')
    .maybeSingle()

  const folderUrl = data?.value ?? ''
  const folderId = folderUrl ? parseDriveFolderId(folderUrl) : null

  if (!folderId) {
    return NextResponse.json(
      { error: 'Pasta do Drive não configurada em Personalização.' },
      { status: 400 }
    )
  }

  try {
    const images = await listDriveImages(folderId)
    return NextResponse.json({ images })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro ao listar imagens do Drive' },
      { status: 502 }
    )
  }
}
