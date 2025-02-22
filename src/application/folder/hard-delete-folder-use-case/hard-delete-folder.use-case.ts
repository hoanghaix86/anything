import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { HardDeleteFolderCommand } from './hard-delete-folder.command'
import { FolderProps } from 'src/domain/entities/folder'

@Injectable()
export class HardDeleteFolderUseCase {
    constructor(
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    public async execute(input: HardDeleteFolderCommand): Promise<FolderProps> {
        const folder = await this.folderRepository.findOneById(input.accountId, input.folderId)
        if (!folder) {
            throw new NotFoundException('Folder not found or does not belong to the account')
        }

        if (!folder.deletedAt) {
            throw new BadRequestException('Folder must be in trash before permanent deletion')
        }

        await this.folderRepository.delete(folder)

        return folder.toValue()
    }
}
