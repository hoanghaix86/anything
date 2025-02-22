import { Body, Controller, Post } from '@nestjs/common'
import { UploadFileUseCase } from 'src/application/file/upload-file-use-case/upload-file.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'
import { CreateFileDto } from './create-file.dto'

@Controller('files')
export class CreateFileController {
    constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

    @Post()
    async run(@Auth() auth: AuthDto, @Body() dto: CreateFileDto) {
        return await this.uploadFileUseCase.execute({
            ownerId: auth.id,
            ...dto,
        })
    }
}
