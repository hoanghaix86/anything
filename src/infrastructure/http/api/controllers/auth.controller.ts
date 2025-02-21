import { Body, Controller, Post } from '@nestjs/common'
import { SignInUseCase } from 'src/application/auth/sign-in-use-case/sign-in.use-case'
import { SignUpUseCase } from 'src/application/auth/sign-up-use-case/sign-up.use-case'
import { SignInDto, SignUpDto } from './auth.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
    ) {}

    @Post('signup')
    public async signUp(@Body() dto: SignUpDto) {
        return await this.signUpUseCase.execute(dto)
    }

    @Post('signin')
    public async signIn(@Body() dto: SignInDto) {
        return await this.signInUseCase.execute(dto)
    }
}
