import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shouldRedirectToLogin } from './auth-guard.ts'

test('redireciona rota /admin sem usuário autenticado', () => {
  assert.equal(shouldRedirectToLogin('/admin/projetos', false), true)
})

test('não redireciona /admin/login mesmo sem usuário', () => {
  assert.equal(shouldRedirectToLogin('/admin/login', false), false)
})

test('não redireciona rota /admin com usuário autenticado', () => {
  assert.equal(shouldRedirectToLogin('/admin/projetos', true), false)
})

test('não redireciona rota pública', () => {
  assert.equal(shouldRedirectToLogin('/projetos', false), false)
})
