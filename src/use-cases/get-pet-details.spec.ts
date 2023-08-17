import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Fetch Pets On City Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'Fred',
      description: 'Pelagem escura com bolinhas brancas',
      city: 'borborema',
      sex: 'MALE',
      age: 3,
      type: 'viralata',
      orgId: 'org-01',
    })

    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Fred')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
