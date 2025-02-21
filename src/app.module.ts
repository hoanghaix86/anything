import { Module } from '@nestjs/common'
import { configurations } from './infrastructure/configurations'
import { controllers } from './infrastructure/http/api/controllers'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { services } from './application/services'
@Module({
    imports: [...configurations, InfrastructureModule],
    controllers: [...controllers],
    providers: [...services],
})
export class AppModule {}
