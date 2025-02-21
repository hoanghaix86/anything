import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('quotas')
export class QuotaEntity {
    @PrimaryColumn()
    id: string

    @Column({ name: 'account_id' })
    accountId: string

    @Column()
    used: number

    @Column()
    limit: number

    @Column({ name: 'created_at' })
    createdAt: Date
}
