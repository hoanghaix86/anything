import { Injectable } from '@nestjs/common'
import { CreateAccountUseCase } from 'src/application/account/create-account-use-case/create-account.use-case'
import { SignUpCommand } from './sign-up.command'

@Injectable()
export class SignUpUseCase {
    constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

    async execute(input: SignUpCommand): Promise<void> {
        await this.createAccountUseCase.execute(input)
    }
}
