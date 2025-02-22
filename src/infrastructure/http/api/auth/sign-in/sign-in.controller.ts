import { Body, Controller, Post } from '@nestjs/common'
import { SignInUseCase } from 'src/application/auth/sign-in-use-case/sign-in.use-case'
import { SignInDto } from './sign-in.dto'
import { Public } from '../../shared/decorators/public.decorator'

@Controller('/auth/signin')
export class SignInController {
    constructor(private readonly signInUseCase: SignInUseCase) {}

    @Public()
    @Post()
    public async signIn(@Body() dto: SignInDto) {
        return await this.signInUseCase.execute(dto)
    }
}
