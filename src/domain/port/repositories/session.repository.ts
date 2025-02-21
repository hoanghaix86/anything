import { Session } from 'src/domain/entities/session'

export const ISessionRepositoryPort = 'ISessionRepositoryPort'

export interface ISessionRepositoryPort {
    save(session: Session): Promise<Session>
    findOneByAccoutId(accountId: string): Promise<Session | undefined>
    findByAccoutId(accountId: string): Promise<Session[]>
}
