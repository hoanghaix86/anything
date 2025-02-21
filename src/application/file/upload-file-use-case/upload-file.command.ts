export interface UploadFileCommand {
    ownerId: string
    path: string // path in uploaded folder
    name: string
    size: number
    mimeType: string
    parentId?: string
}
