import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Folder, FolderProps } from 'src/domain/entities/folder'
import { IAccountRepositoryPort } from 'src/domain/port/repositories/account.repository'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { CreateFolderCommand } from './create-folder.command'

@Injectable()
export class CreateFolderUseCase {
    constructor(
        @Inject(IAccountRepositoryPort)
        private readonly accountRepository: IAccountRepositoryPort,
        @Inject(IFolderRepositoryPort)
        private readonly folderRepository: IFolderRepositoryPort,
    ) {}

    async execute(input: CreateFolderCommand): Promise<FolderProps> {
        const account = await this.accountRepository.findOneById(input.accountId)
        if (!account) {
            throw new NotFoundException('Account not found')
        }

        if (input.parentId) {
            const parentFolder = await this.folderRepository.findOneById(input.accountId, input.parentId)
            if (!parentFolder) {
                throw new BadRequestException('Parent folder not found')
            }
        }

        const folder = Folder.create({ name: input.name, ownerId: input.accountId, parentId: input.parentId })
        await this.folderRepository.save(folder)

        return folder.toValue()
    }
}
