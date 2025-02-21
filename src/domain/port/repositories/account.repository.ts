import { Account } from 'src/domain/entities/account'

export const IAccountRepositoryPort = 'IAccountRepositoryPort'

export interface IAccountRepositoryPort {
    save(account: Account): Promise<Account>
    findOneByEmail(email: string): Promise<Account | undefined>
    findOneById(id: string): Promise<Account | undefined>
    find(): Promise<Account[]>
}
