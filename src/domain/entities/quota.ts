import { v7 } from 'uuid'

export interface QuotaProps {
    id: string
    accountId: string
    used: number
    limit: number
    createdAt: Date
}

export class Quota {
    private static readonly BYTES_PER_GIB = 1024 * 1024 * 1024
    private static readonly DEFAULT_GIB = 15

    private readonly _id: string
    private readonly _accountId: string
    private _used: number
    private _limit: number
    private readonly _createdAt: Date

    private constructor(props: QuotaProps) {
        this._id = props.id
        this._accountId = props.accountId
        this._used = Number(props.used)
        this._limit = Number(props.limit)
        this._createdAt = new Date(props.createdAt)
    }

    public get id(): string {
        return this._id
    }

    public get accountId(): string {
        return this._accountId
    }

    public get used(): number {
        return this._used
    }

    public get limit(): number {
        return this._limit
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    static create(accountId: string): Quota {
        const id = v7()
        const defaultVolume = Number(Quota.DEFAULT_GIB * Quota.BYTES_PER_GIB)
        const defaultUsed = 0
        const createdAt = new Date()
        return new Quota({
            id,
            accountId,
            used: defaultUsed,
            limit: defaultVolume,
            createdAt,
        })
    }

    static restore(props: QuotaProps): Quota {
        return new Quota(props)
    }

    hasAvailableSpace(value: number): boolean {
        return this.used + value <= this.limit
    }

    addUsage(value: number): void {
        if (!this.hasAvailableSpace(value)) {
            throw new Error('Quota exceeded')
        }
        this._used += value
    }

    removeUsage(value: number): void {
        this._used = this._used - value
    }

    changeLimit(unitAsGib: number): void {
        this._limit = Number(unitAsGib * Quota.BYTES_PER_GIB)
    }

    toValue(): QuotaProps {
        return {
            id: this._id,
            accountId: this._accountId,
            used: this._used,
            limit: this._limit,
            createdAt: this._createdAt,
        }
    }
}
