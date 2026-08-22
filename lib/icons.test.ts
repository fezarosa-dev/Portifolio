import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveIcon, iconUrl } from './icons.ts'

test('resolveIcon prioriza o devicon quando a tecnologia está nos dois catálogos', () => {
  const result = resolveIcon('Python')
  assert.equal(result?.source, 'devicon')
  assert.equal(result?.slug, 'python')
})

test('resolveIcon cai pro simple icons quando não está no devicon (ex: Railway)', () => {
  assert.deepEqual(resolveIcon('Railway'), { slug: 'railway', variant: null, source: 'simpleicon' })
})

test('resolveIcon retorna null quando não está em nenhum catálogo', () => {
  assert.equal(resolveIcon('LinguagemInventadaXPTO'), null)
})

test('iconUrl com source custom retorna o slug como está (é a URL direta)', () => {
  assert.equal(iconUrl('https://exemplo.com/icone.svg', 'plain', 'custom'), 'https://exemplo.com/icone.svg')
})

test('iconUrl com source simpleicon monta a URL do cdn.simpleicons.org', () => {
  assert.equal(iconUrl('railway', 'plain', 'simpleicon'), 'https://cdn.simpleicons.org/railway')
})

test('iconUrl sem source (ou devicon) monta a URL do devicons.io', () => {
  assert.equal(
    iconUrl('python', 'plain', null),
    'https://cdn.jsdelivr.net/gh/vorillaz/devicons/packages/core/export-files/icons/python.svg'
  )
  assert.equal(
    iconUrl('python', 'plain', 'devicon'),
    'https://cdn.jsdelivr.net/gh/vorillaz/devicons/packages/core/export-files/icons/python.svg'
  )
})
