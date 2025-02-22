import { Body, Controller, Post } from '@nestjs/common'
import { SignUpUseCase } from 'src/application/auth/sign-up-use-case/sign-up.use-case'
import { SignUpDto } from './sign-up.dto'

@Controller('/auth/signup')
export class SignUpController {
    constructor(private readonly signUpUseCase: SignUpUseCase) {}

    @Post()
    public async signUp(@Body() dto: SignUpDto) {
        return await this.signUpUseCase.execute(dto)
    }
}
