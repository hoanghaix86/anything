import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const multerConfig = MulterModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cfg: ConfigService) => ({
        dest: cfg.get<string>('LOCAL_UPLOAD')!,
    }),
})
