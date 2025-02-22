import { Controller, Delete, Param } from '@nestjs/common'
import { HardDeleteFolderUseCase } from 'src/application/folder/hard-delete-folder-use-case/hard-delete-folder.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'

@Controller('folders')
export class HardDeleteFolderController {
    constructor(private readonly hardDeleteFolderUseCase: HardDeleteFolderUseCase) {}

    @Delete(':folderId/hard')
    async run(@Auth() auth: AuthDto, @Param('folderId') folderId: string) {
        return await this.hardDeleteFolderUseCase.execute({
            accountId: auth.id,
            folderId,
        })
    }
}
