import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
