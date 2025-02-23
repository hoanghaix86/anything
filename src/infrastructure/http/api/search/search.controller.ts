import { Controller, Get, Query } from '@nestjs/common'
import { SearchUseCase } from 'src/application/search-use-case/search.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../shared/decorators/auth.decorator'
import { SearchDto } from './search.dto'

@Controller('search')
export class SearchController {
    constructor(private readonly searchUseCase: SearchUseCase) {}

    @Get()
    async search(@Auth() authDto: AuthDto, @Query() query: SearchDto) {
        return await this.searchUseCase.execute({
            ownerId: authDto.id,
            options: query,
        })
    }
}
