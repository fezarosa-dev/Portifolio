import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveText, parseBilingualPt, parseBilingualEn } from './bilingual.ts'

test('locale pt com pt preenchido retorna o pt, independente do en', () => {
  assert.equal(resolveText('Olá', 'Hello', 'pt'), 'Olá')
  assert.equal(resolveText('Olá', null, 'pt'), 'Olá')
  assert.equal(resolveText('Olá', '', 'pt'), 'Olá')
})

test('locale en com en preenchido retorna o en, independente do pt', () => {
  assert.equal(resolveText('Olá', 'Hello', 'en'), 'Hello')
  assert.equal(resolveText(null, 'Hello', 'en'), 'Hello')
  assert.equal(resolveText('', 'Hello', 'en'), 'Hello')
})

test('locale pt com pt não decidido (null) cai pro en, se houver', () => {
  assert.equal(resolveText(null, 'Hello', 'pt'), 'Hello')
  assert.equal(resolveText(undefined, 'Hello', 'pt'), 'Hello')
})

test('locale en com en não decidido (null) cai pro pt, se houver', () => {
  assert.equal(resolveText('Olá', null, 'en'), 'Olá')
  assert.equal(resolveText('Olá', undefined, 'en'), 'Olá')
})

test('lado explicitamente vazio (\'\') não cai pro outro', () => {
  assert.equal(resolveText('', 'Hello', 'pt'), '')
  assert.equal(resolveText('Olá', '', 'en'), '')
})

test('os dois ausentes/vazios retorna vazio', () => {
  assert.equal(resolveText(null, null, 'pt'), '')
  assert.equal(resolveText(null, null, 'en'), '')
  assert.equal(resolveText('', '', 'pt'), '')
})

test('parseBilingualPt: texto preenchido retorna o texto', () => {
  const fd = new FormData()
  fd.set('title', 'Olá')
  assert.equal(parseBilingualPt(fd, 'title'), 'Olá')
})

test('parseBilingualPt: vazio sem checkbox retorna null (cai pro en)', () => {
  const fd = new FormData()
  fd.set('title', '')
  assert.equal(parseBilingualPt(fd, 'title'), null)
})

test('parseBilingualPt: vazio com checkbox "sem texto" retorna string vazia', () => {
  const fd = new FormData()
  fd.set('title', '')
  fd.set('title_blank', 'true')
  assert.equal(parseBilingualPt(fd, 'title'), '')
})

test('parseBilingualEn: texto preenchido retorna o texto', () => {
  const fd = new FormData()
  fd.set('title_en', 'Hello')
  assert.equal(parseBilingualEn(fd, 'title'), 'Hello')
})

test('parseBilingualEn: vazio sem checkbox retorna null (cai pro pt)', () => {
  const fd = new FormData()
  fd.set('title_en', '')
  assert.equal(parseBilingualEn(fd, 'title'), null)
})

test('parseBilingualEn: vazio com checkbox "sem tradução" retorna string vazia', () => {
  const fd = new FormData()
  fd.set('title_en', '')
  fd.set('title_en_blank', 'true')
  assert.equal(parseBilingualEn(fd, 'title'), '')
})

test('parseBilingualPt/En: campos ausentes do FormData também caem pro outro lado', () => {
  const fd = new FormData()
  assert.equal(parseBilingualPt(fd, 'title'), null)
  assert.equal(parseBilingualEn(fd, 'title'), null)
})
