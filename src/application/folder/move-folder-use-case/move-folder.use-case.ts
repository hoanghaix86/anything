import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { MoveFolderCommand } from './move-folder.command'
import { FolderProps } from 'src/domain/entities/folder'

@Injectable()
export class MoveFolderUseCase {
    constructor(
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    public async execute(input: MoveFolderCommand): Promise<FolderProps> {
        const folder = await this.folderRepository.findOneById(input.accountId, input.folderId)
        if (!folder) {
            throw new NotFoundException('Folder not found or does not belong to the account')
        }

        if (input.targetFolderId) {
            const targetFolder = await this.folderRepository.findOneById(input.accountId, input.targetFolderId)
            if (!targetFolder) {
                throw new NotFoundException('Target folder not found or does not belong to the account')
            }
        }

        try {
            folder.moveTo(input.targetFolderId)
        } catch (error) {
            throw new BadRequestException(error)
        }

        await this.folderRepository.save(folder)

        return folder.toValue()
    }
}
