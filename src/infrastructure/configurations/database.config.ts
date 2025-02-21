import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

export const databaseConfig = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => ({
            type: 'postgres',
            url: cfg.get<string>('DB_URL')!,
            synchronize: true,
            autoLoadEntities: true,
            logging: false,
        }),
    }),
]
