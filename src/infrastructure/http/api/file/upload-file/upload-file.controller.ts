import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadFileUseCase } from 'src/application/file/upload-file-use-case/upload-file.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'

@Controller('files')
export class UploadFileController {
    constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async run(
        @Auth() authDto: AuthDto,
        @UploadedFile() file: Express.Multer.File,
        @Body('parentId') parentId?: string,
    ) {
        return await this.uploadFileUseCase.execute({
            ownerId: authDto.id,
            path: file.path,
            name: file.originalname,
            size: file.size,
            mimeType: file.mimetype,
            parentId: parentId,
        })
    }
}
