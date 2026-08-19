export type TypingStep =
  | { kind: 'type'; char: string }
  | { kind: 'delete' }
  | { kind: 'pause'; ms: number }

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

function randomWrongLetter(correct: string, rand: () => number): string {
  const isUpper = correct !== correct.toLowerCase()
  const correctLower = correct.toLowerCase()
  let candidate: string
  do {
    candidate = LETTERS[Math.floor(rand() * LETTERS.length)]
  } while (candidate === correctLower)
  return isUpper ? candidate.toUpperCase() : candidate
}

export function buildTypingScript(
  text: string,
  options: { typoChance?: number; typoPauseMs?: number; rand?: () => number } = {}
): TypingStep[] {
  const { typoChance = 0.45, typoPauseMs = 350, rand = Math.random } = options
  const words = text.split(' ')
  const steps: TypingStep[] = []

  words.forEach((word, wordIndex) => {
    const letterIndices: number[] = []
    for (let i = 0; i < word.length; i++) {
      if (/[a-zA-Z]/.test(word[i])) letterIndices.push(i)
    }

    const makesTypo = letterIndices.length > 0 && rand() < typoChance
    const typoAt = makesTypo ? letterIndices[Math.floor(rand() * letterIndices.length)] : -1

    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (i === typoAt) {
        steps.push({ kind: 'type', char: randomWrongLetter(char, rand) })
        steps.push({ kind: 'pause', ms: typoPauseMs })
        steps.push({ kind: 'delete' })
        steps.push({ kind: 'type', char })
      } else {
        steps.push({ kind: 'type', char })
      }
    }

    if (wordIndex < words.length - 1) {
      steps.push({ kind: 'type', char: ' ' })
    }
  })

  return steps
}
