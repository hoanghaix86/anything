import { Controller, Post } from '@nestjs/common'
import { CreateFolderUseCase } from 'src/application/folder/create-folder-use-case/create-folder.use-case'

@Controller('folders')
export class CreateFolderController {
    constructor(private createFolderUseCase: CreateFolderUseCase) {}

    @Post()
    async run() {
        return {}
    }
}
