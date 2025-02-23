import { SearchOption } from 'src/application/search-use-case/search.command'
import { File } from 'src/domain/entities/file'

export const IFileRepositoryPort = 'IFileRepositoryPort'

export interface IFileRepositoryPort {
    save(file: File): Promise<File>
    find(): Promise<File[]>
    findOneById(ownerId: string, fileId: string): Promise<File | undefined>
    findManyByFolderId(ownerId: string, folderId: string): Promise<File[]>
    delete(file: File): Promise<void>
    search(ownerId: string, options: SearchOption): Promise<File[]>
}
