import { Account } from 'src/domain/entities/account'
import { AccountEntity } from '../entities/account.entity'

export class AccountMapper {
    static toDomain(entity: AccountEntity): Account {
        return Account.restore({
            id: entity.id,
            email: entity.email,
            password: entity.password,
        })
    }

    static toPersistence(domain: Account): AccountEntity {
        const entity = new AccountEntity()
        entity.id = domain.id
        entity.email = domain.email.getValue()
        entity.password = domain.password.getValue()
        return entity
    }
}
