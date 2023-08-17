import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsOnCityUseCase } from './fetch-pets-on-city'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsOnCityUseCase

describe('Fetch Pets On City Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsOnCityUseCase(petsRepository)

    await petsRepository.create({
      name: 'Fred',
      description: 'Pelagem escura com bolinhas brancas',
      city: 'borborema',
      sex: 'MALE',
      age: 10,
      type: 'yorkshire',
      orgId: 'org-01',
    })

    await petsRepository.create({
      name: 'Todynha',
      description: 'Branco com pintinhas pretas',
      city: 'catanduva',
      sex: 'FEMALE',
      age: 10,
      type: 'pinscher',
      orgId: 'org-02',
    })

    await petsRepository.create({
      name: 'Princess',
      description: 'Pelagem branca',
      city: 'catanduva',
      sex: 'FEMALE',
      age: 3,
      type: 'viralata',
      orgId: 'org-03',
    })
  })

  it('should be able to find pets in a city', async () => {
    const { pets } = await sut.execute({
      city: 'borborema',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Fred',
      }),
    ])
  })

  it('should be able to find pets in a city with filters', async () => {
    const { pets } = await sut.execute({
      city: 'catanduva',
      filter: {
        sex: 'FEMALE',
        age: 10,
        type: 'pinscher',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Todynha',
      }),
    ])
  })
})
