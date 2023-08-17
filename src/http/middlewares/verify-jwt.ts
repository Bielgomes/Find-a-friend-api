import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    request.jwtVerify()
  } catch {
    reply.status(401).send({ message: 'Unauthorized.' })
  }
}
