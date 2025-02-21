import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CreateQuotaUseCase } from 'src/application/quota/create-quota-use-case/create-quota.use-case'
import { Account } from 'src/domain/entities/account'
import { IPasswordHasherPort } from 'src/domain/port/password-hasher.port'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'
import { EmailValueObject } from 'src/domain/value-objects/email.value-object'
import { PasswordValueObject } from 'src/domain/value-objects/password.value-object'
import { CreateAccountCommand } from './create-account.command'

@Injectable()
export class CreateAccountUseCase {
    constructor(
        @Inject(IAccountRepositoryPort)
        private accountRepository: IAccountRepositoryPort,
        private createQuotaUseCase: CreateQuotaUseCase,
        @Inject(IPasswordHasherPort)
        private passwordHasher: IPasswordHasherPort,
    ) {}

    async execute(input: CreateAccountCommand): Promise<void> {
        const existingAccount = await this.accountRepository.findOneByEmail(input.email)
        if (existingAccount) {
            throw new ConflictException('Email already exists')
        }

        const email = EmailValueObject.fromRaw(input.email)
        const password = await PasswordValueObject.createFromRaw(input.password, this.passwordHasher)

        const account = Account.create({ email, password })
        await this.accountRepository.save(account)

        // init 15GiB
        await this.createQuotaUseCase.execute({ accountId: account.id })
    }
}
