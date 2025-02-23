import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('files')
export class FileEntity {
    @PrimaryColumn()
    id: string

    @Column({ name: 'owner_id' })
    ownerId: string

    @Column({ name: 'parent_id', default: null })
    parentId?: string

    @Column()
    source: string

    @Column()
    name: string

    @Column({ type: 'bigint' })
    size: number

    @Column()
    mimeType: string

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'deleted_at', default: null })
    deletedAt?: Date
}
