const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3'

export function parseDriveFolderId(url: string): string | null {
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

export type DriveImage = {
  id: string
  name: string
  thumbnailLink: string
}

function requireApiKey(): string {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY
  if (!apiKey) throw new Error('GOOGLE_DRIVE_API_KEY não configurada')
  return apiKey
}

export async function listDriveImages(folderId: string): Promise<DriveImage[]> {
  const apiKey = requireApiKey()
  const q = encodeURIComponent(
    `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`
  )
  const fields = encodeURIComponent('files(id,name,thumbnailLink)')
  const url = `${DRIVE_API_BASE}/files?q=${q}&fields=${fields}&key=${apiKey}`

  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) {
    throw new Error(`Falha ao listar arquivos do Drive: ${res.status}`)
  }
  const data = (await res.json()) as { files?: DriveImage[] }
  return data.files ?? []
}

export async function fetchDriveImage(fileId: string): Promise<Response> {
  const apiKey = requireApiKey()
  const url = `${DRIVE_API_BASE}/files/${fileId}?alt=media&key=${apiKey}`
  return fetch(url)
}
