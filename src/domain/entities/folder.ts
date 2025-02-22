import { v7 } from 'uuid'

export interface FolderProps {
    id: string
    name: string
    ownerId: string
    parentId?: string
    deletedAt?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FolderCreateProps extends Omit<FolderProps, 'id'> {}

export class Folder {
    private readonly _id: string
    private readonly _ownerId: string
    private _name: string
    private _parentId?: string
    private _deletedAt?: Date

    private constructor(props: FolderProps) {
        this._id = props.id
        this._ownerId = props.ownerId
        this._name = props.name
        this._parentId = props.parentId
        this._deletedAt = props.deletedAt ? new Date(props.deletedAt) : undefined
    }

    // get
    public get id(): string {
        return this._id
    }

    public get name(): string {
        return this._name
    }

    public get ownerId(): string {
        return this._ownerId
    }

    public get parentId(): string | undefined {
        return this._parentId
    }

    public get deletedAt(): Date | undefined {
        return this._deletedAt
    }

    // functions

    public static create(props: FolderCreateProps): Folder {
        if (!props.name.trim()) {
            throw new Error('Folder name cannot be empty')
        }
        const id = v7()
        return new Folder({ ...props, id })
    }

    public static restore(props: FolderProps): Folder {
        return new Folder(props)
    }

    public rename(newName: string): void {
        if (!newName.trim()) {
            throw new Error('New folder name cannot be empty')
        }
        this._name = newName
    }

    public moveTo(newParentId: string | undefined): void {
        if (this.parentId === newParentId) {
            throw new Error('Folder is already inside the target folder')
        }
        this._parentId = newParentId
    }

    public softDelete(): void {
        if (this.deletedAt) {
            throw new Error('Folder is already deleted')
        }
        this._deletedAt = new Date()
    }

    public restoreSoftDelete(): void {
        if (!this.deletedAt) {
            throw new Error('Folder is not deleted')
        }
        this._deletedAt = undefined
    }

    toValue(): FolderProps {
        return {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            parentId: this.parentId,
            deletedAt: this.deletedAt ? this.deletedAt.toISOString() : undefined,
        }
    }
}
