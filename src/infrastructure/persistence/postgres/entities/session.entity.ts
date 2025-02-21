import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('sessions')
export class SessionEntity {
    @PrimaryColumn()
    id: string

    @Column({ name: 'account_id' })
    accountId: string

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'expires_at' })
    expiresAt: Date
}