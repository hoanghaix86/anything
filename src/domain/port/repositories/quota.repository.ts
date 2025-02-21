import { Quota } from 'src/domain/entities/quota'

export const IQuotaRepositoryPort = 'IQuotaRepositoryPort'

export interface IQuotaRepositoryPort {
    save(quota: Quota): Promise<Quota>
    findOneByAccountId(accountId: string): Promise<Quota | undefined>
    delete(quota: Quota): Promise<void>
}
