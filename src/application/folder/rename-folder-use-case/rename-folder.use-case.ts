import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { RenameFolderCommand } from './rename-folder.command'
import { FolderProps } from 'src/domain/entities/folder'

@Injectable()
export class RenameFolderUseCase {
    constructor(
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    public async execute(input: RenameFolderCommand): Promise<FolderProps> {
        const folder = await this.folderRepository.findOneById(input.accountId, input.folderId)
        if (!folder) {
            throw new NotFoundException('Folder not found or does not belong to the account')
        }

        try {
            folder.rename(input.newName)
        } catch (error) {
            throw new BadRequestException(error)
        }

        await this.folderRepository.save(folder)

        return folder.toValue()
    }
}
