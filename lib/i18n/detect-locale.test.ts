import { test } from 'node:test'
import assert from 'node:assert/strict'
import { detectLocaleFromAcceptLanguage } from './detect-locale.ts'

test('escolhe pt quando pt vem primeiro', () => {
  assert.equal(detectLocaleFromAcceptLanguage('pt-BR,pt;q=0.9,en;q=0.8'), 'pt')
})

test('escolhe en quando en vem primeiro', () => {
  assert.equal(detectLocaleFromAcceptLanguage('en-US,en;q=0.9,pt;q=0.8'), 'en')
})

test('ignora idiomas não suportados e cai pro próximo da lista', () => {
  assert.equal(detectLocaleFromAcceptLanguage('fr-FR,fr;q=0.9,en;q=0.8'), 'en')
})

test('retorna pt como padrão quando nada é reconhecido', () => {
  assert.equal(detectLocaleFromAcceptLanguage('fr-FR,de;q=0.9'), 'pt')
})

test('retorna pt para string vazia', () => {
  assert.equal(detectLocaleFromAcceptLanguage(''), 'pt')
})
