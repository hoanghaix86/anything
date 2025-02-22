import { Body, Controller, Param, Patch } from '@nestjs/common'
import { MoveFileUseCase } from 'src/application/file/move-file-use-case/move-file.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'
import { MoveFileDto } from './move-file.dto'

@Controller('files')
export class MoveFileController {
    constructor(private readonly moveFileUseCase: MoveFileUseCase) {}

    @Patch(':fileId/move')
    async run(@Auth() auth: AuthDto, @Param('fileId') fileId: string, @Body() dto: MoveFileDto) {
        return await this.moveFileUseCase.execute({
            ownerId: auth.id,
            fileId,
            targetFolderId: dto.targetFolderId,
        })
    }
}
