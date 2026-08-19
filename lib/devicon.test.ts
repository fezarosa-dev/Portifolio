import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findDeviconIcon, deviconIconUrl } from './devicon.ts'

test('encontra ícone por nome exato', () => {
  assert.deepEqual(findDeviconIcon('Python'), { slug: 'python', variant: 'original' })
})

test('encontra ícone por nome com caixa/espaços diferentes', () => {
  assert.deepEqual(findDeviconIcon('  TypeScript '), { slug: 'typescript', variant: 'original' })
})

test('encontra ícone por altname (ex: C#)', () => {
  const result = findDeviconIcon('C#')
  assert.equal(result?.slug, 'csharp')
})

test('retorna null para linguagem não catalogada', () => {
  assert.equal(findDeviconIcon('LinguagemInventadaXPTO'), null)
})

test('deviconIconUrl monta a URL do CDN corretamente', () => {
  assert.equal(
    deviconIconUrl('python', 'original'),
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  )
})
