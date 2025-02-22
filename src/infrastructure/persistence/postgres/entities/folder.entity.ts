import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('folders')
export class FolderEntity {
    @PrimaryColumn()
    id: string

    @Column({ name: 'owner_id' })
    ownerId: string

    @Column()
    name: string

    @Column({ name: 'parent_id', default: null })
    parentId?: string

    @Column({ name: 'deleted_at', default: null })
    deletedAt?: Date
}
