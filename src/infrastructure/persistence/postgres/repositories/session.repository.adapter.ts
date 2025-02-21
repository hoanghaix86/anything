import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from 'src/domain/entities/session'
import { ISessionRepositoryPort } from 'src/domain/port/repositories/session.repository'
import { Repository } from 'typeorm'
import { SessionEntity } from '../entities/session.entity'
import { SessionMapper } from '../mappers/session.mapper'

@Injectable()
export class SessionRepositoryAdapter implements ISessionRepositoryPort {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,
    ) {}

    async save(session: Session): Promise<Session> {
        const entity = SessionMapper.toPersistence(session)
        const savedEntity = await this.sessionRepository.save(entity)
        return SessionMapper.toDomain(savedEntity)
    }

    async findOneByAccoutId(accountId: string): Promise<Session | undefined> {
        const entity = await this.sessionRepository.findOneBy({ accountId })
        return entity ? SessionMapper.toDomain(entity) : undefined
    }

    async findByAccoutId(accountId: string): Promise<Session[]> {
        const entities = await this.sessionRepository.findBy({ accountId })
        return entities.map((entity) => SessionMapper.toDomain(entity))
    }
}
