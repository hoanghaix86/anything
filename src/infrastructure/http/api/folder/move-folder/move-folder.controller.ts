import { Body, Controller, Param, Patch } from '@nestjs/common'
import { MoveFolderUseCase } from 'src/application/folder/move-folder-use-case/move-folder.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'
import { MoveFolderDto } from './move-folder.dto'

@Controller('folders')
export class MoveFolderController {
    constructor(private readonly moveFolderUseCase: MoveFolderUseCase) {}

    @Patch(':folderId/move')
    async run(@Auth() auth: AuthDto, @Param('folderId') folderId: string, @Body() dto: MoveFolderDto) {
        await this.moveFolderUseCase.execute({
            accountId: auth.id,
            folderId,
            targetFolderId: dto.targetFolderId,
        })
    }
}
