import { Module } from '@nestjs/common'
import { configurations } from './infrastructure/configurations'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { services } from './application/services'
import { controllers } from './infrastructure/http/api/controllers'
import { guards } from './infrastructure/http/api/guards'

@Module({
    imports: [...configurations, InfrastructureModule],
    controllers: [...controllers],
    providers: [...services, ...guards],
})
export class AppModule {}
