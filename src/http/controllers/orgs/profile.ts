import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgDetailsParamsSchema = z.object({
    orgId: z.string(),
  })

  const { orgId } = getOrgDetailsParamsSchema.parse(request.params)

  try {
    const getOrgProfileUseCase = makeGetOrgProfileUseCase()

    const { org } = await getOrgProfileUseCase.execute({
      orgId,
    })

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
