import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseDriveFolderId, resolveDriveImageUrl } from './drive.ts'
import type { DriveImage } from './drive.ts'

test('extrai o id de uma URL de pasta compartilhada', () => {
  assert.equal(
    parseDriveFolderId(
      'https://drive.google.com/drive/folders/1sZet3oMgGbQIhx1_9RZQSxy1kU2AKhnw?usp=sharing'
    ),
    '1sZet3oMgGbQIhx1_9RZQSxy1kU2AKhnw'
  )
})

test('extrai o id de uma URL de pasta sem query string', () => {
  assert.equal(
    parseDriveFolderId('https://drive.google.com/drive/folders/abc123XYZ'),
    'abc123XYZ'
  )
})

test('retorna null para uma URL que não é de pasta do Drive', () => {
  assert.equal(parseDriveFolderId('https://example.com/not-a-drive-link'), null)
})

test('retorna null para string vazia', () => {
  assert.equal(parseDriveFolderId(''), null)
})

const IMAGES: DriveImage[] = [{ id: 'abc123', name: 'foto.jpg', thumbnailLink: '' }]

test('resolveDriveImageUrl encontra imagem pelo nome exato', () => {
  assert.equal(resolveDriveImageUrl('foto.jpg', IMAGES), '/api/drive-image/abc123')
})

test('resolveDriveImageUrl retorna null quando não encontra', () => {
  assert.equal(resolveDriveImageUrl('nao-existe.jpg', IMAGES), null)
})
