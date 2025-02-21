import { Folder } from 'src/domain/entities/folder'
import { FolderEntity } from '../entities/folder.entity'

export class FolderMapper {
    static toDomain(entity: FolderEntity): Folder {
        return Folder.restore({
            id: entity.id,
            name: entity.name,
            ownerId: entity.ownerId,
            parentId: entity.parentId,
            deletedAt: entity.deletedAt?.toISOString(),
        })
    }

    static toPersistence(domain: Folder): FolderEntity {
        const entity = new FolderEntity()
        entity.id = domain.id
        entity.name = domain.name
        entity.ownerId = domain.ownerId
        entity.parentId = domain.parentId
        entity.deletedAt = domain.deletedAt
        return entity
    }
}
