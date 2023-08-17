import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    cep: z.string(),
    whatsappNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
    password: z.string().min(6),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute(data)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
