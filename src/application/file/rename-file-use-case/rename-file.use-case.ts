import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { FileProps } from 'src/domain/entities/file'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { RenameFileCommand } from './rename-file.command'

@Injectable()
export class RenameFileUseCase {
    constructor(
        @Inject(IFileRepositoryPort)
        private readonly fileRepository: IFileRepositoryPort,
    ) {}

    public async execute(input: RenameFileCommand): Promise<FileProps> {
        const file = await this.fileRepository.findOneById(
            input.ownerId,
            input.fileId,
        )
        if (!file) {
            throw new NotFoundException(
                'File not found or does not belong to the owner',
            )
        }

        file.rename(input.newName)

        const output = await this.fileRepository.save(file)
        return output.toValue()
    }
}
