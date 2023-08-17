import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post(`/sessions`).send({
    email: 'caosemdono@hotmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    id: org.id,
  }
}
