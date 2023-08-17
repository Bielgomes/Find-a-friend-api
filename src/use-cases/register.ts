import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  address: string
  cep: string
  whatsappNumber: string
  password: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    address,
    cep,
    whatsappNumber,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      address,
      cep,
      whatsappNumber,
      password_hash,
    })

    return { org }
  }
}
