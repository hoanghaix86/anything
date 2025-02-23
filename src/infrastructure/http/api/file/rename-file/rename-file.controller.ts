import { Body, Controller, Param, Patch } from '@nestjs/common'
import { RenameFileUseCase } from 'src/application/file/rename-file-use-case/rename-file.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'
import { RenameFileDto } from './rename-file.dto'

@Controller('files')
export class RenameFileController {
    constructor(private readonly renameFileUseCase: RenameFileUseCase) {}

    @Patch(':fileId')
    async run(
        @Auth() auth: AuthDto,
        @Param('fileId') fileId: string,
        @Body() dto: RenameFileDto,
    ) {
        return await this.renameFileUseCase.execute({
            ownerId: auth.id,
            fileId,
            newName: dto.newName,
        })
    }
}
