import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { File } from 'src/domain/entities/file'
import { IFileRepositoryPort } from 'src/domain/port/repositories/file.repository'
import { Repository } from 'typeorm'
import { FileEntity } from '../entities/file.entity'
import { FileMapper } from '../mappers/file.mapper'

@Injectable()
export class FileRepositoryAdapter implements IFileRepositoryPort {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {}

    async save(file: File): Promise<File> {
        const entity = FileMapper.toPersistence(file)
        const savedEntity = await this.fileRepository.save(entity)
        return FileMapper.toDomain(savedEntity)
    }

    async find(): Promise<File[]> {
        const entities = await this.fileRepository.find()
        return entities.map((entity) => FileMapper.toDomain(entity))
    }

    async findOneById(ownerId: string, fileId: string): Promise<File | undefined> {
        const entity = await this.fileRepository.findOne({ where: { id: fileId, ownerId } })
        return entity ? FileMapper.toDomain(entity) : undefined
    }

    async findManyByFolderId(ownerId: string, folderId: string): Promise<File[]> {
        const entities = await this.fileRepository.find({ where: { ownerId, parentId: folderId } })
        return entities.map((entity) => FileMapper.toDomain(entity))
    }

    async delete(file: File): Promise<void> {
        await this.fileRepository.delete({ id: file.id, ownerId: file.ownerId })
    }
}
