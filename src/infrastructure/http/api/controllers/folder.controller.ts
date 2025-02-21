// import { Body, Controller, Get, Post } from '@nestjs/common'
// import { AuthInput } from 'src/application/inputs/auth.input'
// import { CreateFolderInput } from 'src/application/inputs/folder.input'
// import { FolderService } from 'src/services/folder.service'
// import { Auth } from '../decorators/auth.decorator'
// import { CreateFolderDto } from '../dtos/folder.dto'

// @Controller('folders')
// export class FolderController {
//     constructor(private readonly folderService: FolderService) {}

//     @Post()
//     async createFolder(
//         @Auth() authInput: AuthInput,
//         @Body() dto: CreateFolderDto,
//     ) {
//         return await this.folderService.createFolder(
//             authInput,
//             new CreateFolderInput(dto.name, dto.parentId),
//         )
//     }

//     @Get()
//     async find() {
//         return await this.folderService.find()
//     }
// }
