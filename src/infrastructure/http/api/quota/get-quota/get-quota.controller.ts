import { Controller, Get } from '@nestjs/common'
import { GetQuotaUseCase } from 'src/application/quota/get-quota-use-case/get-quota.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'

@Controller('quotas')
export class GetQuotaController {
    constructor(private getQuotaUseCase: GetQuotaUseCase) {}

    @Get()
    async run(@Auth() authDto: AuthDto) {
        return await this.getQuotaUseCase.execute(authDto.id)
    }
}
