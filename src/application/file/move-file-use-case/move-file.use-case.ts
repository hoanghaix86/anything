import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { MoveFileCommand } from './move-file.command'

@Injectable()
export class MoveFileUseCase {
    constructor(
        @Inject(IFileRepositoryPort)
        private readonly fileRepository: IFileRepositoryPort,
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    public async execute(input: MoveFileCommand): Promise<void> {
        const file = await this.fileRepository.findOneById(input.ownerId, input.fileId)
        if (!file) {
            throw new NotFoundException('File not found or does not belong to the owner')
        }

        const targetFolder = await this.folderRepository.findOneById(input.ownerId, input.targetFolderId)
        if (!targetFolder) {
            throw new NotFoundException('Target folder not found or does not belong to the owner')
        }

        if (file.parentId === input.targetFolderId) {
            throw new BadRequestException('File is already in the target folder')
        }

        file.moveToFolder(input.targetFolderId)

        await this.fileRepository.save(file)
    }
}
