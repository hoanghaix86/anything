import { Controller, Delete, Param } from '@nestjs/common'
import { HardDeleteFileUseCase } from 'src/application/file/hard-delete-file-use-case/hard-delete-file.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'

@Controller('files')
export class HardDeleteFileController {
    constructor(private hardDeleteFileUseCase: HardDeleteFileUseCase) {}

    @Delete(':fileId/permanent')
    async run(@Auth() authDto: AuthDto, @Param('fileId') fileId: string) {
        return await this.hardDeleteFileUseCase.execute({
            ownerId: authDto.id,
            fileId,
        })
    }
}
