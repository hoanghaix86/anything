import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Folder } from 'src/domain/entities/folder'
import { IFolderRepositoryPort } from 'src/domain/port/repositories/folder.repository'
import { Repository } from 'typeorm'
import { FolderEntity } from '../entities/folder.entity'
import { FolderMapper } from '../mappers/folder.mapper'

@Injectable()
export class FolderRepositoryAdapter implements IFolderRepositoryPort {
    constructor(
        @InjectRepository(FolderEntity)
        private readonly folderRepository: Repository<FolderEntity>,
    ) {}

    async save(folder: Folder): Promise<Folder> {
        const entity = FolderMapper.toPersistence(folder)
        const savedEntity = await this.folderRepository.save(entity)
        return FolderMapper.toDomain(savedEntity)
    }

    async find(): Promise<Folder[]> {
        const entities = await this.folderRepository.find()
        return entities.map((entity) => FolderMapper.toDomain(entity))
    }

    async findOneById(ownerId: string, folderId: string): Promise<Folder | undefined> {
        const entity = await this.folderRepository.findOneBy({ ownerId, id: folderId })
        if (entity) {
            return FolderMapper.toDomain(entity)
        }
        return undefined
    }

    async delete(folder: Folder): Promise<void> {
        await this.folderRepository.delete({ ownerId: folder.ownerId, id: folder.id })
    }
}
