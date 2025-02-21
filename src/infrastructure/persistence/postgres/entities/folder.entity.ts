import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('folders')
export class FolderEntity {
    @PrimaryColumn()
    id: string

    @Column({ name: 'owner_id' })
    ownerId: string

    @Column()
    name: string

    @Column({ name: 'parent_id', default: undefined })
    parentId?: string

    @Column({ name: 'deleted_at', default: undefined })
    deletedAt?: Date
}
