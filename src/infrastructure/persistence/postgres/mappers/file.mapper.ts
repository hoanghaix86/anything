import { File } from 'src/domain/entities/file'
import { FileEntity } from '../entities/file.entity'

export class FileMapper {
    static toDomain(entity: FileEntity): File {
        return File.restore({
            id: entity.id,
            ownerId: entity.ownerId,
            parentId: entity.parentId,
            source: entity.source,
            name: entity.name,
            size: entity.size,
            mimeType: entity.mimeType,
            createdAt: new Date(entity.createdAt),
            deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : undefined,
        })
    }

    static toPersistence(domain: File): FileEntity {
        const entity = new FileEntity()
        entity.id = domain.id
        entity.ownerId = domain.ownerId
        entity.parentId = domain.parentId
        entity.source = domain.source
        entity.name = domain.name
        entity.size = domain.size
        entity.mimeType = domain.mimeType
        entity.createdAt = domain.createdAt
        entity.deletedAt = domain.deletedAt
        return entity
    }
}
