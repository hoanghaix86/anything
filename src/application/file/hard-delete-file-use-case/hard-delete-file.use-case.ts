import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { IStorageSourcePort } from 'src/domain/port/storage-source.port'
import { HardDeleteFileCommand } from './hard-delete-file.command'

@Injectable()
export class HardDeleteFileUseCase {
    constructor(
        @Inject(IFileRepositoryPort)
        private fileRepository: IFileRepositoryPort,
        @Inject(IStorageSourcePort)
        private storageSource: IStorageSourcePort,
    ) {}

    public async execute(input: HardDeleteFileCommand): Promise<void> {
        const file = await this.fileRepository.findOneById(input.ownerId, input.fileId)
        if (!file) {
            throw new NotFoundException('File not found or does not belong to the owner')
        }

        await this.storageSource.delete(file.source)

        await this.fileRepository.delete(file)
    }
}
