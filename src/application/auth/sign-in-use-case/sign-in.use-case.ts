import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import { IPasswordHasherPort } from 'src/domain/port/password-hasher.port'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'
import { EmailValueObject } from 'src/domain/value-objects/email.value-object'
import { SignInCommand } from './sign-in.command'

@Injectable()
export class SignInUseCase {
    constructor(
        @Inject(IAccountRepositoryPort)
        private accountRepository: IAccountRepositoryPort,
        @Inject(IPasswordHasherPort)
        private passwordHasher: IPasswordHasherPort,
        @Inject(IAuthTokenPort)
        private authToken: IAuthTokenPort,
    ) {}

    async execute(input: SignInCommand): Promise<{ accessToken: string }> {
        // Create and validate email value object
        // Create and validate email value object
        const emailVO = EmailValueObject.fromRaw(input.email)

        // Find account by email
        const account = await this.accountRepository.findOneByEmail(emailVO.getValue())
        if (!account) {
            throw new UnauthorizedException('Invalid email or password')
        }

        // Validate password
        const isValid = await this.passwordHasher.compare(input.password, account.password.getValue())
        if (!isValid) {
            throw new UnauthorizedException('Invalid email or password')
        }

        // Generate JWT token
        const token = this.authToken.generate()
        return { accessToken: token }
    }
}
