import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveText, parseBilingualField } from './bilingual.ts'

test('locale pt sempre retorna o texto em pt, independente do en', () => {
  assert.equal(resolveText('Olá', 'Hello', 'pt'), 'Olá')
  assert.equal(resolveText('Olá', null, 'pt'), 'Olá')
  assert.equal(resolveText('Olá', '', 'pt'), 'Olá')
})

test('locale en com tradução preenchida retorna a tradução', () => {
  assert.equal(resolveText('Olá', 'Hello', 'en'), 'Hello')
})

test('locale en sem tradução (null) cai pro pt', () => {
  assert.equal(resolveText('Olá', null, 'en'), 'Olá')
  assert.equal(resolveText('Olá', undefined, 'en'), 'Olá')
})

test('locale en com tradução explicitamente vazia mostra vazio, não cai pro pt', () => {
  assert.equal(resolveText('Olá', '', 'en'), '')
})

test('parseBilingualField: texto em en preenchido retorna o texto', () => {
  const fd = new FormData()
  fd.set('title_en', 'Hello')
  assert.equal(parseBilingualField(fd, 'title'), 'Hello')
})

test('parseBilingualField: vazio sem checkbox retorna null (cai pro pt)', () => {
  const fd = new FormData()
  fd.set('title_en', '')
  assert.equal(parseBilingualField(fd, 'title'), null)
})

test('parseBilingualField: vazio com checkbox "sem tradução" retorna string vazia', () => {
  const fd = new FormData()
  fd.set('title_en', '')
  fd.set('title_en_blank', 'true')
  assert.equal(parseBilingualField(fd, 'title'), '')
})

test('parseBilingualField: campo _en ausente do FormData também cai pro pt', () => {
  const fd = new FormData()
  assert.equal(parseBilingualField(fd, 'title'), null)
})
