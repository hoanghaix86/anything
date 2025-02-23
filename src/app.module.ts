import { Module } from '@nestjs/common'
import { services } from './application/services'
import { configurations } from './infrastructure/configurations'
import { controllers } from './infrastructure/http/api/controllers'
import { guards } from './infrastructure/http/api/shared/guards'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
    imports: [...configurations, InfrastructureModule],
    controllers: [...controllers],
    providers: [...services, ...guards],
})
export class AppModule {}
