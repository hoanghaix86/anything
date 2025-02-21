import { v7 } from 'uuid'

interface QuotaProps {
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
        this._used = props.used
        this._limit = props.limit
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
        const defaultVolume = Quota.DEFAULT_GIB * Quota.BYTES_PER_GIB
        const defaultUsed = 0
        const createdAt = new Date()
        return new Quota({ id, accountId, used: defaultUsed, limit: defaultVolume, createdAt })
    }

    static restore(props: QuotaProps): Quota {
        return new Quota(props)
    }

    

    hasAvailableSpace(fileSize: number): boolean {
        return this.used + fileSize <= this.limit
    }

    addUsage(fileSize: number): void {
        if (!this.hasAvailableSpace(fileSize)) {
            throw new Error('Quota exceeded')
        }
        this._used += fileSize
    }

    removeUsage(fileSize: number): void {
        this._used = Math.max(0, this._used - fileSize)
    }

    changeQuota(newQuotaGiB: number): void {
        if (newQuotaGiB < this._limit / Quota.BYTES_PER_GIB) {
            throw new Error('New quota must be greater than current quota')
        }
        this._limit = newQuotaGiB * Quota.BYTES_PER_GIB
    }
}
