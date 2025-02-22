import { Body, Controller, Post } from '@nestjs/common'
import { CreateFolderUseCase } from 'src/application/folder/create-folder-use-case/create-folder.use-case'
import { AuthDto } from 'src/lib/dtos'
import { Auth } from '../../shared/decorators/auth.decorator'
import { CreateFolderDto } from './create-folder.dto'

@Controller('folders')
export class CreateFolderController {
    constructor(private createFolderUseCase: CreateFolderUseCase) {}

    @Post()
    async run(@Auth() auth: AuthDto, @Body() dto: CreateFolderDto) {
        return await this.createFolderUseCase.execute({ accountId: auth.id, ...dto })
    }
}
