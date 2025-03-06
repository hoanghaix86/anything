import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
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
        const emailVO = EmailValueObject.fromRaw(input.email)

        const account = await this.accountRepository.findOneByEmail(
            emailVO.getValue(),
        )
        if (!account) {
            throw new BadRequestException('Invalid email or password')
        }

        const isValid = await this.passwordHasher.compare(
            input.password,
            account.password.getValue(),
        )
        if (!isValid) {
            throw new BadRequestException('Invalid email or password')
        }

        const accessToken = this.authToken.generate({ id: account.id })
        return { accessToken }
    }
}
