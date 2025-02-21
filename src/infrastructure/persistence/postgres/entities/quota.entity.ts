import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('quotas')
export class QuotaEntity {
    @PrimaryColumn()
    id: string

    @Column({ name: 'account_id' })
    accountId: string

    @Column({ type: 'bigint' })
    used: number

    @Column({ type: 'bigint' })
    limit: number

    @Column({ name: 'created_at' })
    createdAt: Date
}
