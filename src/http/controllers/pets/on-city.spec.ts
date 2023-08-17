import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Pets On City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pets on a city', async () => {
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

    await prisma.pet.create({
      data: {
        name: 'Fred',
        description: 'Pelagem branca',
        city: 'borborema',
        sex: 'MALE',
        age: 10,
        type: 'viralata',
        orgId: org.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Frederico',
        description: 'Pelagem branca',
        city: 'borborema',
        sex: 'MALE',
        age: 1,
        type: 'viralata',
        orgId: org.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Daniel',
        description: 'Pelagem branca',
        city: 'catanduva',
        sex: 'MALE',
        age: 5,
        type: 'viralata',
        orgId: org.id,
      },
    })

    const response = await request(app.server).get(
      '/pets/city/borborema?age=10',
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Fred',
      }),
    ])
  })
})
