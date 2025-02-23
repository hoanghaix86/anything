import { Inject, Injectable } from '@nestjs/common'
import { QuotaProps } from 'src/domain/entities/quota'
import { ChangeQuotaLimitCommand } from './change-quota-limit.command'

import { IQuotaRepositoryPort } from '../../../domain/port/repositories/quota.repository'

@Injectable()
export class ChangeQuotaLimitUseCase {
    constructor(
        @Inject(IQuotaRepositoryPort)
        private readonly quotaRepository: IQuotaRepositoryPort,
    ) {}

    async execute(command: ChangeQuotaLimitCommand): Promise<QuotaProps> {
        const quota = await this.quotaRepository.findOneByAccountId(command.accountId)
        if (!quota) {
            throw new Error(`Quota not found for account ${command.accountId}`)
        }

        quota.changeLimit(command.changeValue)
        const updatedQuota = await this.quotaRepository.save(quota)
        return updatedQuota.toValue()
    }
}
