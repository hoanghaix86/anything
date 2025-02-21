// import {
//     Controller,
//     Logger,
//     Post,
//     UploadedFile,
//     UseInterceptors,
// } from '@nestjs/common'
// import { FileInterceptor } from '@nestjs/platform-express'
// import { AuthInput } from 'src/application/inputs/auth.input'
// import {
//     UploadChunkInput,
//     UploadSingleInput,
// } from 'src/application/inputs/upload.input'
// import {
//     UploadChunkDto,
//     UploadSingleDto,
// } from 'src/presentation/http/dtos/upload.dto'
// import { UploadService } from 'src/services/upload.service'
// import { Auth } from '../decorators/auth.decorator'
// import {
//     UploadChunkHeaderPayload,
//     UploadSingleHeaderPayload,
// } from '../decorators/upload-header.decorator'

// @Controller('upload')
// export class UploadController {
//     private readonly logger = new Logger(UploadController.name)

//     constructor(private readonly uploadService: UploadService) {}

//     @Post('single')
//     @UseInterceptors(FileInterceptor('file'))
//     async uploadFile(
//         @Auth() authInput: AuthInput,
//         @UploadedFile() file: Express.Multer.File,
//         @UploadSingleHeaderPayload() dto: UploadSingleDto,
//     ) {
//         return await this.uploadService.uploadFileSingle(
//             authInput,
//             new UploadSingleInput(
//                 dto.name,
//                 dto.size,
//                 dto.mimetype,
//                 dto.parentId,
//             ),
//             file.path,
//         )
//     }

//     @Post('chunk')
//     @UseInterceptors(FileInterceptor('file'))
//     async uploadFileChunk(
//         @Auth() authInput: AuthInput,
//         @UploadedFile() file: Express.Multer.File,
//         @UploadChunkHeaderPayload() dto: UploadChunkDto,
//     ) {
//         // this.logger.debug(util.inspect(dto))
//         return await this.uploadService.uploadFileChunk(
//             authInput,
//             new UploadChunkInput(
//                 dto.name,
//                 dto.size,
//                 dto.mimetype,
//                 dto.currentPart,
//                 dto.totalPart,
//                 dto.parentId,
//             ),
//             file.path,
//         )
//     }
// }
