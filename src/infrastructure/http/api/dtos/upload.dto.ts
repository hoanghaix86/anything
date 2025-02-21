export class UploadSingleDto {
    name: string
    size: number
    mimetype: string
    parentId?: string
}

export class UploadChunkDto {
    name: string
    size: number
    mimetype: string
    currentPart: number
    totalPart: number
    parentId?: string
}
