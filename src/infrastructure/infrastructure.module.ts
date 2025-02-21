import { Module } from '@nestjs/common'
import { PersistenceModule } from './persistence/persistence.module'
import { AdapterModule } from './adapter/adapter.module'
import { StorageModule } from './storage/storage.module'

@Module({
    imports: [PersistenceModule, AdapterModule, StorageModule],
    exports: [PersistenceModule, AdapterModule, StorageModule],
})
export class InfrastructureModule {}
