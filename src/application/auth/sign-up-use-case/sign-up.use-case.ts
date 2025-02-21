import { Injectable, ConflictException, Inject } from '@nestjs/common'
import { Account } from 'src/domain/entities/account'
import { IPasswordHasherPort } from 'src/domain/port/password-hasher.port'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'
import { EmailValueObject } from 'src/domain/value-objects/email.value-object'
import { PasswordValueObject } from 'src/domain/value-objects/password.value-object'
import { SignUpCommand } from './sign-up.command'

@Injectable()
export class SignUpUseCase {
    constructor(
        @Inject(IAccountRepositoryPort)
        private accountRepository: IAccountRepositoryPort,
        @Inject(IPasswordHasherPort)
        private passwordHasher: IPasswordHasherPort,
    ) {}

    async execute(input: SignUpCommand): Promise<void> {
        // Create and validate email value object
        const email = EmailValueObject.fromRaw(input.email)

        // Check if email already exists
        const existingAccount = await this.accountRepository.findOneByEmail(email.getValue())
        if (existingAccount) {
            throw new ConflictException('Email is already in use')
        }

        // Create and validate password value object
        const password = await PasswordValueObject.createFromRaw(input.password, this.passwordHasher)

        // Create and save account
        const account = Account.create({ email, password })
        await this.accountRepository.save(account)
    }
}
