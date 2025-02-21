import { Folder } from 'src/domain/entities/folder'

export const IFolderRepositoryPort = 'IFolderRepositoryPort'

export interface IFolderRepositoryPort {
    save(folder: Folder): Promise<Folder>
    find(): Promise<Folder[]>
    findOneById(ownerId: string, folderId: string): Promise<Folder | undefined>
    delete(folder: Folder): Promise<void>
}
