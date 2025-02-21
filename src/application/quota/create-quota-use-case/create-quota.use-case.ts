import { Inject, Injectable } from '@nestjs/common'
import { Quota } from 'src/domain/entities/quota'
import { IQuotaRepositoryPort } from 'src/domain/port/repositories/quota.repository'
import { CreateQuotaCommand } from './create-quota.command'

@Injectable()
export class CreateQuotaUseCase {
    constructor(
        @Inject(IQuotaRepositoryPort)
        private readonly quotaRepository: IQuotaRepositoryPort,
    ) {}

    public async execute(input: CreateQuotaCommand): Promise<Quota> {
        const quota = Quota.create(input.accountId)

        return await this.quotaRepository.save(quota)
    }
}
