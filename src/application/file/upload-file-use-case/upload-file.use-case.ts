import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ChangeQuotaUsedUseCase } from 'src/application/quota/change-quota-used-use-case/change-quota-used.use-case'
import { File, FileProps } from 'src/domain/entities/file'
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
        private readonly changeQuotaUsedUseCase: ChangeQuotaUsedUseCase,
    ) {}

    async execute(input: UploadFileCommand): Promise<FileProps> {
        try {
            if (input.parentId) {
                const folder = await this.folderRepository.findOneById(
                    input.ownerId,
                    input.parentId,
                )
                if (!folder) {
                    throw new NotFoundException(
                        'Folder not found or does not belong to the owner',
                    )
                }
            }

            const source = await this.storageSource.save(input.path)

            const file = File.create({
                ...input,
                source,
            })

            const output = await this.fileRepository.save(file)
            await this.changeQuotaUsedUseCase.execute({
                accountId: input.ownerId,
                value: input.size,
                operation: 'add',
            })
            return output.toValue()
        } catch (error) {
            await this.storageSource.delete(input.path)
            throw error
        }
    }
}
