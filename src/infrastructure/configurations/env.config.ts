import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

export const envConfig = ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: __dirname + '/../../../.env',
    ignoreEnvFile: false,
    validationSchema: Joi.object({
        APP_ENV: Joi.string().valid('development', 'production').required(),
        PORT: Joi.number().port().required(),
        JWT_SECRET: Joi.string().required(),
        DB_URL: Joi.string().required(),
        LOCAL_UPLOAD: Joi.string().required(),
        LOCAL_STORAGE: Joi.string().required(),
    }),
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
})
