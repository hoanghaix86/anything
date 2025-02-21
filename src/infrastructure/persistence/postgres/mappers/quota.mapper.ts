import { Quota } from 'src/domain/entities/quota'
import { QuotaEntity } from '../entities/quota.entity'

export class QuotaMapper {
    static toDomain(entity: QuotaEntity): Quota {
        return Quota.restore({
            id: entity.id,
            accountId: entity.accountId,
            used: entity.used,
            limit: entity.limit,
            createdAt: new Date(entity.createdAt),
        })
    }

    static toPersistence(domain: Quota): QuotaEntity {
        const entity = new QuotaEntity()
        entity.id = domain.id
        entity.accountId = domain.accountId
        entity.used = domain.used
        entity.limit = domain.limit
        entity.createdAt = domain.createdAt
        return entity
    }
}
