import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from 'src/domain/entities/account'
import { Repository } from 'typeorm'
import { AccountEntity } from '../entities/account.entity'
import { AccountMapper } from '../mappers/account.mapper'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'

@Injectable()
export class PgAccountRepositoryAdapter implements IAccountRepositoryPort {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    async save(account: Account): Promise<Account> {
        const entity = AccountMapper.toPersistence(account)
        const savedEntity = await this.accountRepository.save(entity)
        return AccountMapper.toDomain(savedEntity)
    }

    async findOneByEmail(email: string): Promise<Account | undefined> {
        const entity = await this.accountRepository.findOne({ where: { email } })
        return entity ? AccountMapper.toDomain(entity) : undefined
    }

    async findOneById(id: string): Promise<Account | undefined> {
        const entity = await this.accountRepository.findOne({ where: { id } })
        return entity ? AccountMapper.toDomain(entity) : undefined
    }

    async find(): Promise<Account[]> {
        const entities = await this.accountRepository.find()
        return entities.map((entity) => AccountMapper.toDomain(entity))
    }
}
