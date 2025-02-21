import { Module } from '@nestjs/common'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'
import { PgAccountRepositoryAdapter } from './repositories/pg-account.repository.adapter'
import { ISessionRepositoryPort } from 'src/domain/port/repositories/session.repository'
import { SessionRepositoryAdapter } from './repositories/session.repository.adapter'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { FolderRepositoryAdapter } from './repositories/folder.repository.adapter'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { FileRepositoryAdapter } from './repositories/file.repository.apdapter'
import { IQuotaRepositoryPort } from 'src/domain/port/repositories/quota.repository'
import { QuotaRepositoryAdapter } from './repositories/quota.repository.adapter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountEntity } from './entities/account.entity'
import { FileEntity } from './entities/file.entity'
import { FolderEntity } from './entities/folder.entity'
import { QuotaEntity } from './entities/quota.entity'
import { SessionEntity } from './entities/session.entity'

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity, SessionEntity, FolderEntity, FileEntity, QuotaEntity])],
    providers: [
        {
            provide: IAccountRepositoryPort,
            useClass: PgAccountRepositoryAdapter,
        },
        {
            provide: ISessionRepositoryPort,
            useClass: SessionRepositoryAdapter,
        },
        {
            provide: IFolderRepositoryPort,
            useClass: FolderRepositoryAdapter,
        },
        {
            provide: IFileRepositoryPort,
            useClass: FileRepositoryAdapter,
        },
        {
            provide: IQuotaRepositoryPort,
            useClass: QuotaRepositoryAdapter,
        },
    ],
    exports: [
        IAccountRepositoryPort,
        ISessionRepositoryPort,
        IFolderRepositoryPort,
        IFileRepositoryPort,
        IQuotaRepositoryPort,
    ],
})
export class PostgresModule {}
