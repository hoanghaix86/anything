import { Module } from '@nestjs/common'
import { IPasswordHasherPort } from 'src/domain/port/password-hasher.port'
import { PasswordHasherAdapter } from './password-hasher.adapter'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import { AuthTokenAdapter } from './auth-token.adapter'

@Module({
    providers: [
        {
            provide: IPasswordHasherPort,
            useClass: PasswordHasherAdapter,
        },
        {
            provide: IAuthTokenPort,
            useClass: AuthTokenAdapter,
        },
    ],
    exports: [IPasswordHasherPort, IAuthTokenPort],
})
export class AdapterModule {}
