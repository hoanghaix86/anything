import { Inject, Injectable } from '@nestjs/common'
import { QuotaProps } from '../../../domain/entities/quota'
import { IQuotaRepositoryPort } from '../../../domain/port/repositories/quota.repository'
import { ChangeQuotaUsedCommand } from './change-quota-used.command'

@Injectable()
export class ChangeQuotaUsedUseCase {
    constructor(
        @Inject(IQuotaRepositoryPort)
        private readonly quotaRepository: IQuotaRepositoryPort,
    ) {}

    async execute(command: ChangeQuotaUsedCommand): Promise<QuotaProps> {
        const quota = await this.quotaRepository.findOneByAccountId(command.accountId)
        if (!quota) {
            throw new Error(`Quota not found for account ${command.accountId}`)
        }

        if (command.operation === 'add') {
            if (!quota.hasAvailableSpace(command.value)) {
                throw new Error('Not enough quota space available')
            }
            quota.addUsage(command.value)
        } else {
            quota.removeUsage(command.value)
        }

        const updatedQuota = await this.quotaRepository.save(quota)
        return updatedQuota.toValue()
    }
}
