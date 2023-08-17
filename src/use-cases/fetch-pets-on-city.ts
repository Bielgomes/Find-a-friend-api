import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Sex } from '@prisma/client'

export interface PetFilter {
  age?: number
  sex?: Sex
  type?: string
}

interface FetchPetsOnCityUseCaseRequest {
  city: string
  filter?: PetFilter
}

interface FetchPetsOnCityUseCaseResponses {
  pets: Pet[]
}

export class FetchPetsOnCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filter,
  }: FetchPetsOnCityUseCaseRequest): Promise<FetchPetsOnCityUseCaseResponses> {
    const pets = await this.petsRepository.findManyByCity(city, filter)

    return { pets }
  }
}
