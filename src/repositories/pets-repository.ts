import { PetFilter } from '@/use-cases/fetch-pets-on-city'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string, filter?: PetFilter): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
