import { makeFetchPetsOnCityUseCase } from '@/use-cases/factories/make-fetch-pets-on-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function onCity(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsOnCityParamsSchema = z.object({
    city: z.string(),
    age: z.number().min(0).optional(),
    sex: z.enum(['MALE', 'FEMALE']).optional(),
    type: z.string().optional(),
  })

  const feetchPetsOnCityQuerySchema = z.object({
    age: z.coerce.number().min(0).optional(),
    sex: z.enum(['MALE', 'FEMALE']).optional(),
    type: z.string().optional(),
  })

  const { city } = fetchPetsOnCityParamsSchema.parse(request.params)

  const filter = feetchPetsOnCityQuerySchema.parse(request.query)

  const fetchPetsOnCityUseCase = makeFetchPetsOnCityUseCase()

  const { pets } = await fetchPetsOnCityUseCase.execute({
    city,
    filter,
  })

  return reply.status(200).send({
    pets,
  })
}
