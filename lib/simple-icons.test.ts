import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findSimpleIcon } from './simple-icons.ts'

test('encontra ícone por nome exato', () => {
  assert.deepEqual(findSimpleIcon('Railway'), { slug: 'railway' })
})

test('encontra ícone por nome com caixa/espaços diferentes', () => {
  assert.deepEqual(findSimpleIcon('  resend '), { slug: 'resend' })
})

test('retorna null para linguagem não catalogada', () => {
  assert.equal(findSimpleIcon('LinguagemInventadaXPTO'), null)
})

test('retorna null para string vazia', () => {
  assert.equal(findSimpleIcon('   '), null)
})
