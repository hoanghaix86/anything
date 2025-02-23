import { Inject, Injectable } from '@nestjs/common'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { SearchCommand, SearchOutput } from './search.command'

@Injectable()
export class SearchUseCase {
    constructor(
        @Inject(IFileRepositoryPort)
        private fileRepository: IFileRepositoryPort,
        @Inject(IFolderRepositoryPort)
        private folderRepository: IFolderRepositoryPort,
    ) {}

    async execute(command: SearchCommand): Promise<SearchOutput[]> {
        const files = await this.fileRepository.search(
            command.ownerId,
            command.options,
        )

        const folders = await this.folderRepository.search(
            command.ownerId,
            command.options,
        )

        const output: SearchOutput[] = []
        files.map((item) =>
            output.push({ id: item.id, name: item.name, type: 'file' }),
        )
        folders.map((item) =>
            output.push({ id: item.id, name: item.name, type: 'folder' }),
        )

        return output
    }
}
