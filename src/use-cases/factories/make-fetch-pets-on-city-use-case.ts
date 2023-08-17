import { FetchPetsOnCityUseCase } from '../fetch-pets-on-city'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsOnCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsOnCityUseCase(petsRepository)

  return useCase
}
