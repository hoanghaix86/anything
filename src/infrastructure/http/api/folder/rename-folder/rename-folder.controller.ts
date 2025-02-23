import { Body, Controller, Param, Patch } from '@nestjs/common'
import { RenameFolderUseCase } from 'src/application/folder/rename-folder-use-case/rename-folder.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'
import { RenameFolderDto } from './rename-folder.dto'

@Controller('folders')
export class RenameFolderController {
    constructor(private readonly renameFolderUseCase: RenameFolderUseCase) {}

    @Patch(':folderId')
    async run(
        @Auth() auth: AuthDto,
        @Param('folderId') folderId: string,
        @Body() dto: RenameFolderDto,
    ) {
        return await this.renameFolderUseCase.execute({
            accountId: auth.id,
            folderId,
            newName: dto.newName,
        })
    }
}
