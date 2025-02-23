export class CreateFileDto {
    path: string
    name: string
    size: number
    mimeType: string
    parentId?: string
}
