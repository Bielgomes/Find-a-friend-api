import { describe, it, beforeEach, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from './get-org-profile'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password_hash: '123456',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Cão Sem Dono')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
