import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { PetFilter } from '@/use-cases/fetch-pets-on-city'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string, filter?: PetFilter) {
    return this.items.filter((pet) => {
      const isInSameCity = pet.city === city

      const ageMatches = filter?.age === undefined || pet.age === filter?.age
      const sexMatches = filter?.sex === undefined || pet.sex === filter?.sex
      const typeMatches =
        filter?.type === undefined || pet.type === filter?.type

      return isInSameCity && ageMatches && sexMatches && typeMatches
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      sex: data.sex,
      age: data.age,
      type: data.type,
      orgId: data.orgId,
    }

    this.items.push(pet)

    return pet
  }
}
