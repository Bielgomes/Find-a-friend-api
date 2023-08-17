import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Sex } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  city: string
  sex: Sex
  age: number
  type: string
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    city,
    sex,
    age,
    type,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      city,
      sex,
      age,
      type,
      orgId,
    })

    return { pet }
  }
}
