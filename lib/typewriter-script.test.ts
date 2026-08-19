import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildTypingScript } from './typewriter-script.ts'

function typedText(steps: { kind: string; char?: string }[]): string {
  let out = ''
  for (const step of steps) {
    if (step.kind === 'type') out += step.char
    if (step.kind === 'delete') out = out.slice(0, -1)
  }
  return out
}

test('sem erro (rand sempre alto): digita a palavra normalmente, sem pausa nem delete', () => {
  const steps = buildTypingScript('Ola', { rand: () => 0.99 })
  assert.deepEqual(
    steps.map((s) => s.kind),
    ['type', 'type', 'type']
  )
  assert.equal(typedText(steps), 'Ola')
})

test('com erro (rand sempre baixo): digita errado, pausa, apaga, digita certo — e o erro nunca é igual à letra certa', () => {
  const steps = buildTypingScript('Ola', { rand: () => 0 })
  assert.equal(steps[0].kind, 'type')
  assert.equal(steps[1].kind, 'pause')
  assert.equal(steps[2].kind, 'delete')
  assert.equal(steps[3].kind, 'type')

  const wrongChar = (steps[0] as { char: string }).char
  const correctChar = (steps[3] as { char: string }).char
  assert.equal(correctChar, 'O')
  assert.notEqual(wrongChar.toLowerCase(), correctChar.toLowerCase())
  assert.equal(typedText(steps), 'Ola')
})

test('a letra errada nunca é igual à letra certa, com rand cíclico', () => {
  const values = [0.5, 0.1, 0.9, 0.3, 0.7, 0.2, 0.8, 0.4, 0.6]
  let i = 0
  const rand = () => values[i++ % values.length]
  const steps = buildTypingScript('teste treino travessia', { rand, typoChance: 1 })

  for (let i = 0; i < steps.length; i++) {
    if (steps[i].kind === 'pause') {
      const wrongChar = (steps[i - 1] as { char: string }).char
      const correctChar = (steps[i + 2] as { char: string }).char
      assert.equal(steps[i + 1].kind, 'delete')
      assert.equal(steps[i + 2].kind, 'type')
      assert.notEqual(wrongChar.toLowerCase(), correctChar.toLowerCase())
    }
  }

  assert.equal(typedText(steps), 'teste treino travessia')
})

test('no máximo 1 erro por palavra, mesmo com typoChance 1', () => {
  const steps = buildTypingScript('abc', { rand: () => 0.5, typoChance: 1 })
  const pauses = steps.filter((s) => s.kind === 'pause')
  assert.equal(pauses.length, 1)
})

test('cada palavra pode errar (várias palavras, todas com erro)', () => {
  const steps = buildTypingScript('um dois tres', { rand: () => 0.5, typoChance: 1 })
  const pauses = steps.filter((s) => s.kind === 'pause')
  assert.equal(pauses.length, 3)
  assert.equal(typedText(steps), 'um dois tres')
})

test('sem erro em nenhuma palavra quando typoChance é 0', () => {
  const steps = buildTypingScript('um dois tres', { rand: () => 0.01, typoChance: 0 })
  assert.equal(steps.some((s) => s.kind === 'pause'), false)
  assert.equal(typedText(steps), 'um dois tres')
})

test('espaços entre palavras são preservados no texto final', () => {
  const steps = buildTypingScript('Eu sou dev', { rand: () => 0.99 })
  assert.equal(typedText(steps), 'Eu sou dev')
})
