import { randomUUID } from 'crypto'

export interface FileProps {
    id: string
    ownerId: string
    parentId?: string
    source: string
    name: string
    size: number
    mimeType: string
    createdAt: Date
    deletedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FileCreateProps
    extends Omit<FileProps, 'id' | 'createdAt' | 'deletedAt'> {}

export class File {
    private readonly _id: string
    private readonly _ownerId: string
    private _parentId?: string
    private _source: string
    private _name: string
    private readonly _size: number
    private readonly _mimeType: string
    private readonly _createdAt: Date
    private _deletedAt?: Date

    private constructor(props: FileProps) {
        this._id = props.id
        this._ownerId = props.ownerId
        this._parentId = props.parentId
        this._source = props.source
        this._name = props.name
        this._size = props.size
        this._mimeType = props.mimeType
        this._createdAt = new Date(props.createdAt)
        this._deletedAt = props.deletedAt
            ? new Date(props.deletedAt)
            : undefined
    }

    public get id(): string {
        return this._id
    }

    public get ownerId(): string {
        return this._ownerId
    }

    public get parentId(): string | undefined {
        return this._parentId
    }

    public get source(): string {
        return this._source
    }

    public get name(): string {
        return this._name
    }

    public get size(): number {
        return this._size
    }

    public get mimeType(): string {
        return this._mimeType
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    public get deletedAt(): Date | undefined {
        return this._deletedAt
    }

    public static create(props: FileCreateProps): File {
        const id = randomUUID()
        const createdAt = new Date()
        return new File({ ...props, id, createdAt })
    }

    public static restore(props: FileProps): File {
        return new File({ ...props })
    }

    public rename(newName: string): void {
        if (!newName || newName.trim().length === 0) {
            throw new Error('File name cannot be empty')
        }
        this._name = newName
    }

    public softDelete(): void {
        if (!this._deletedAt) {
            this._deletedAt = new Date()
        }
    }

    public restoreSoftDelete(): void {
        this._deletedAt = undefined
    }

    public moveToFolder(newFolderId: string): void {
        this._parentId = newFolderId
    }

    public toValue(): FileProps {
        return {
            id: this.id,
            ownerId: this.ownerId,
            parentId: this.parentId,
            source: this.source,
            name: this.name,
            size: this.size,
            mimeType: this.mimeType,
            createdAt: this.createdAt,
            deletedAt: this.deletedAt,
        }
    }
}
