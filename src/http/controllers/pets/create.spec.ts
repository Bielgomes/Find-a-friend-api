import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    const { token, id } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fred',
        description: 'Pelagem branca',
        city: 'borborema',
        sex: 'MALE',
        age: 5,
        type: 'viralata',
        orgId: id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
