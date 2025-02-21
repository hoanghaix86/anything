import { Session } from 'src/domain/entities/session'
import { SessionEntity } from '../entities/session.entity'

export class SessionMapper {
    static toDomain(entity: SessionEntity): Session {
        return Session.restore({
            id: entity.id,
            accountId: entity.accountId,
            createdAt: new Date(entity.createdAt),
            expiresAt: new Date(entity.expiresAt),
        })
    }

    static toPersistence(domain: Session): SessionEntity {
        const entity = new SessionEntity()
        entity.id = domain.id
        entity.accountId = domain.accountId
        entity.createdAt = domain.createdAt
        entity.expiresAt = domain.expiresAt
        return entity
    }
}
