import { Module } from '@nestjs/common'
import { IPasswordHasherPort } from 'src/domain/port/password-hasher.port'
import { PasswordHasherAdapter } from './password-hasher.adapter'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import { JwtAuthTokenAdapter } from './jwt-auth-token.adapter'

@Module({
    providers: [
        {
            provide: IPasswordHasherPort,
            useClass: PasswordHasherAdapter,
        },
        {
            provide: IAuthTokenPort,
            useClass: JwtAuthTokenAdapter,
        },
    ],
    exports: [IPasswordHasherPort, IAuthTokenPort],
})
export class AdapterModule {}
