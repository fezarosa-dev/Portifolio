import { ImageResponse } from 'next/og'
import { getSiteContent } from '@/lib/supabase/queries'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const content = await getSiteContent()
  const title = content.hero_title || 'Felipe Zanoni da Rosa'
  const subtitle = content.hero_subtitle || 'Software Engineer'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          backgroundColor: '#f5f6f8',
          color: '#12151c',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#f2661d',
            fontFamily: 'monospace',
            marginBottom: 24,
          }}
        >
          $ whoami
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 600, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 36, color: '#4b5563', marginTop: 20 }}>
          {subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#f2661d',
            fontFamily: 'monospace',
            marginTop: 56,
          }}
        >
          zanoni.dev.br
        </div>
      </div>
    ),
    { ...size }
  )
}
