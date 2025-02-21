import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('accounts')
export class AccountEntity {
    @PrimaryColumn()
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string
}
