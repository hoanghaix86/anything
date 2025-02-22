import { Controller, Delete, Param } from '@nestjs/common'
import { SoftDeleteFileUseCase } from 'src/application/file/soft-delete-file-use-case/soft-delete-file.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'

@Controller('files')
export class SoftDeleteFileController {
    constructor(private readonly softDeleteFileUseCase: SoftDeleteFileUseCase) {}

    @Delete(':fileId')
    async run(@Auth() auth: AuthDto, @Param('fileId') fileId: string) {
        return await this.softDeleteFileUseCase.execute({
            ownerId: auth.id,
            fileId,
        })
    }
}
