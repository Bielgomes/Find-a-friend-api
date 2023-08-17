import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org profile', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Cão Sem Dono',
        email: 'caosemdono@hotmail.com',
        address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
        cep: '04174-090',
        whatsappNumber: '+551958586273',
        password_hash: '123456',
      },
    })

    const response = await request(app.server).get(`/orgs/${org.id}`).send()

    expect(response.body.org).toEqual(
      expect.objectContaining({
        email: 'caosemdono@hotmail.com',
      }),
    )
  })
})
