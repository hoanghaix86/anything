import { Inject, Injectable } from '@nestjs/common'
import { Session } from 'src/domain/entities/session'
import { ISessionRepositoryPort } from 'src/domain/port/repositories/session.repository'

@Injectable()
export class CreateSessionUseCase {
    constructor(
        @Inject(ISessionRepositoryPort)
        private readonly sessionRepository: ISessionRepositoryPort,
    ) {}

    async execute(accountId: string): Promise<void> {
        const ss = Session.create(accountId)

        await this.sessionRepository.save(ss)
    }
}
