import { Inject, Injectable } from '@nestjs/common'
import { QuotaProps } from 'src/domain/entities/quota'
import { IQuotaRepositoryPort } from 'src/domain/port/repositories/quota.repository'

@Injectable()
export class GetQuotaUseCase {
    constructor(
        @Inject(IQuotaRepositoryPort)
        private quotaRepository: IQuotaRepositoryPort,
    ) {}

    async execute(accountId: string): Promise<QuotaProps> {
        const quota = await this.quotaRepository.findOneByAccountId(accountId)
        if (!quota) {
            throw new Error('Invalid Quota')
        }

        return quota.toValue()
    }
}
