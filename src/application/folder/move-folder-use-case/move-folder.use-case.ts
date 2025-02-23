import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { FolderProps } from 'src/domain/entities/folder'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { MoveFolderCommand } from './move-folder.command'

@Injectable()
export class MoveFolderUseCase {
    constructor(
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    public async execute(input: MoveFolderCommand): Promise<FolderProps> {
        const folder = await this.folderRepository.findOneById(
            input.accountId,
            input.currentId,
        )
        if (!folder) {
            throw new NotFoundException(
                'Folder not found or does not belong to the account',
            )
        }

        if (input.targetId) {
            const targetFolder = await this.folderRepository.findOneById(
                input.accountId,
                input.targetId,
            )
            if (!targetFolder) {
                throw new NotFoundException(
                    'Target folder not found or does not belong to the account',
                )
            }
        }

        try {
            folder.moveTo(input.targetId)
        } catch (error) {
            throw new BadRequestException(error)
        }

        await this.folderRepository.save(folder)

        return folder.toValue()
    }
}
