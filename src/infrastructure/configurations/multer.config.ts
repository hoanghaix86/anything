import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const multerConfig = MulterModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (cfg: ConfigService) => ({
        dest: cfg.get<string>('FOLDER_UPLOAD')!,
    }),
})
