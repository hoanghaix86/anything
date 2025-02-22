import { Controller, Delete, Param } from '@nestjs/common'
import { SoftDeleteFolderUseCase } from 'src/application/folder/soft-delete-folder-use-case/soft-delete-folder.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'

@Controller('folders')
export class SoftDeleteFolderController {
    constructor(private readonly softDeleteFolderUseCase: SoftDeleteFolderUseCase) {}

    @Delete(':folderId')
    async run(@Auth() auth: AuthDto, @Param('folderId') folderId: string) {
        return await this.softDeleteFolderUseCase.execute({
            accountId: auth.id,
            folderId,
        })
    }
}
