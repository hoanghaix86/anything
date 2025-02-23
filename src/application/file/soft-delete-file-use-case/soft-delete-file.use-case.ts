import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { SoftDeleteFileCommand } from './soft-delete-file.command'

@Injectable()
export class SoftDeleteFileUseCase {
    constructor(
        @Inject(IFileRepositoryPort)
        private readonly fileRepository: IFileRepositoryPort,
    ) {}

    public async execute(input: SoftDeleteFileCommand): Promise<void> {
        const file = await this.fileRepository.findOneById(
            input.ownerId,
            input.fileId,
        )
        if (!file) {
            throw new NotFoundException(
                'File not found or does not belong to the owner',
            )
        }

        if (file.deletedAt) {
            throw new BadRequestException('File is already in the trash')
        }

        file.softDelete()

        await this.fileRepository.save(file)
    }
}
