import { describe, it, beforeEach, expect } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create pet', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password_hash: '123456',
    })

    const { pet } = await sut.execute({
      name: 'Fred',
      description: 'Pelagem escura com bolinhas brancas',
      city: 'borborema',
      sex: 'MALE',
      age: 3,
      type: 'viralata',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to create pet an inexistent org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Fred',
        description: 'Pelagem escura com bolinhas brancas',
        city: 'borborema',
        sex: 'MALE',
        age: 3,
        type: 'viralata',
        orgId: 'org-02',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
