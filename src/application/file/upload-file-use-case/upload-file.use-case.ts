import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { File } from 'src/domain/entities/file'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { IStorageSourcePort } from 'src/domain/port/storage-source.port'
import { UploadFileCommand } from './upload-file.command'

@Injectable()
export class UploadFileUseCase {
    constructor(
        @Inject(IStorageSourcePort)
        private readonly storageSource: IStorageSourcePort,
        @Inject(IFileRepositoryPort)
        private readonly fileRepository: IFileRepositoryPort,
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    async execute(input: UploadFileCommand): Promise<File> {
        if (input.parentId) {
            const folder = await this.folderRepository.findOneById(input.ownerId, input.parentId)
            if (!folder) {
                throw new NotFoundException('Folder not found or does not belong to the owner')
            }
        }

        const source = await this.storageSource.save(input.path)

        const file = File.create({ ...input, source })

        return await this.fileRepository.save(file)
    }
}
