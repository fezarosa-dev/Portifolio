'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function BilingualField({
  name,
  label,
  language,
  defaultValuePt,
  defaultValueEn,
  multiline,
  rows,
  fieldClassName,
}: {
  name: string
  label: string
  language: 'pt' | 'en'
  defaultValuePt?: string | null
  defaultValueEn?: string | null
  multiline?: boolean
  rows?: number
  fieldClassName?: string
}) {
  const Field = multiline ? Textarea : Input
  const ptExplicitlyBlank = defaultValuePt === ''
  const enExplicitlyBlank = defaultValueEn === ''

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className={language === 'en' ? 'hidden' : undefined}>
        <Field
          id={name}
          name={name}
          defaultValue={defaultValuePt ?? ''}
          rows={rows}
          placeholder="deixe vazio pra usar o texto em EN"
          className={fieldClassName}
        />
        <label className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-steel">
          <input type="checkbox" name={`${name}_blank`} value="true" defaultChecked={ptExplicitlyBlank} />
          sem texto em PT — não usar o EN no lugar
        </label>
      </div>
      <div className={language === 'pt' ? 'hidden' : undefined}>
        <Field
          id={`${name}_en`}
          name={`${name}_en`}
          defaultValue={defaultValueEn ?? ''}
          rows={rows}
          placeholder="deixe vazio pra usar o texto em PT"
          className={fieldClassName}
        />
        <label className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-steel">
          <input type="checkbox" name={`${name}_en_blank`} value="true" defaultChecked={enExplicitlyBlank} />
          sem tradução — não usar o PT no lugar
        </label>
      </div>
    </div>
  )
}
