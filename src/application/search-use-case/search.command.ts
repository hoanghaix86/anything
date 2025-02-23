export interface SearchOption {
    name?: string
}

export interface SearchCommand {
    ownerId: string
    options: SearchOption
}

export interface SearchOutput {
    id: string
    name: string
    type: 'file' | 'folder'
}
