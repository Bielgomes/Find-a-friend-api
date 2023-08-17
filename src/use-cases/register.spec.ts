import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password: '123456',
    })

    const isPasswordHash = await compare('123456', org.password_hash)

    expect(isPasswordHash).toBe(true)
  })

  it('should be not able to register with same email', async () => {
    await sut.execute({
      name: 'Cão Sem Dono',
      email: 'caosemdono@hotmail.com',
      address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
      cep: '04174-090',
      whatsappNumber: '+551958586273',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Cão Sem Dono',
        email: 'caosemdono@hotmail.com',
        address: 'Rua Honório Serpa, 259 - Jardim Vergueiro, SP',
        cep: '04174-090',
        whatsappNumber: '+551958586273',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
