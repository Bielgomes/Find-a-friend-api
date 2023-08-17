import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { PetFilter } from '@/use-cases/fetch-pets-on-city'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCity(city: string, filter?: PetFilter) {
    const pet = await prisma.pet.findMany({
      where: {
        city,
        ...filter,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
