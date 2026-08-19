'use client'

export function LanguageToggle({
  language,
  onChange,
}: {
  language: 'pt' | 'en'
  onChange: (language: 'pt' | 'en') => void
}) {
  return (
    <div className="inline-flex rounded-md border border-hairline p-0.5 font-mono text-xs">
      {(['pt', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`rounded px-3 py-1 transition-colors ${
            language === lang ? 'bg-signal text-white' : 'text-steel hover:text-foreground'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
