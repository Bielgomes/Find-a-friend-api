import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    sex: z.enum(['MALE', 'FEMALE']),
    age: z.number().min(0),
    type: z.string(),
    orgId: z.string(),
  })

  const data = createBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute(data)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  reply.status(201).send()
}
