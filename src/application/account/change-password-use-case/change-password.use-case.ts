import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IPasswordHasherPort } from 'src/domain/port/password-hasher.port'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'
import { PasswordValueObject } from 'src/domain/value-objects/password.value-object'
import { ChangePasswordCommand } from './change-password.command'

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        @Inject(IAccountRepositoryPort)
        private accountRepository: IAccountRepositoryPort,
        @Inject(IPasswordHasherPort)
        private passwordHasher: IPasswordHasherPort,
    ) {}

    public async execute(input: ChangePasswordCommand): Promise<void> {
        const account = await this.accountRepository.findOneById(input.accountId)
        if (!account) {
            throw new NotFoundException('Account not found')
        }

        const isMatch = await this.passwordHasher.compare(input.oldPassword, account.password.getValue())
        if (!isMatch) {
            throw new ForbiddenException('Current password is incorrect')
        }

        const newPasswordVO = await PasswordValueObject.createFromRaw(input.newPassword, this.passwordHasher)
        account.changePassword(newPasswordVO)

        await this.accountRepository.save(account)
    }
}
