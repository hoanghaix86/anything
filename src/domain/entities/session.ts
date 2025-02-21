import { v7 } from 'uuid'

export interface SessionProps {
    id: string
    accountId: string
    createdAt: Date
    expiresAt: Date
}

export class Session {
    private readonly _id: string
    private readonly _accountId: string
    private readonly _createdAt: Date
    private readonly _expiresAt: Date

    private constructor(props: SessionProps) {
        this._id = props.id
        this._accountId = props.accountId
        this._createdAt = props.createdAt
        this._expiresAt = props.expiresAt
    }

    public get id(): string {
        return this._id
    }

    public get accountId(): string {
        return this._accountId
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    public get expiresAt(): Date {
        return this._expiresAt
    }

    public static create(accountId: string): Session {
        const id = v7()
        const createdAt = new Date()
        const expiresAt = new Date()
        return new Session({
            id,
            accountId,
            createdAt,
            expiresAt
        })
    }

    public static restore(props: SessionProps): Session {
        return new Session({...props})
    }
}
