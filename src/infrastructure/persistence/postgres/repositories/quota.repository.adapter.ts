import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Quota } from 'src/domain/entities/quota'
import { IQuotaRepositoryPort } from 'src/domain/port/repositories/quota.repository'
import { Repository } from 'typeorm'
import { QuotaEntity } from '../entities/quota.entity'
import { QuotaMapper } from '../mappers/quota.mapper'

@Injectable()
export class QuotaRepositoryAdapter implements IQuotaRepositoryPort {
    constructor(
        @InjectRepository(QuotaEntity)
        private readonly quotaRepository: Repository<QuotaEntity>,
    ) {}

    async save(quota: Quota): Promise<Quota> {
        const entity = QuotaMapper.toPersistence(quota)
        return this.quotaRepository.save(entity).then((saved) => QuotaMapper.toDomain(saved))
    }

    async findOneByAccountId(accountId: string): Promise<Quota | undefined> {
        const entity = await this.quotaRepository.findOne({ where: { accountId } })
        return entity ? QuotaMapper.toDomain(entity) : undefined
    }

    async delete(quota: Quota): Promise<void> {
        await this.quotaRepository.delete({ id: quota.id, accountId: quota.accountId })
    }
}
