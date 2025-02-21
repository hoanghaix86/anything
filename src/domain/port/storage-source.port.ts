export const IStorageSourcePort = 'IStorageSourcePort'

export interface IStorageSourcePort {
    save(filePath: string): Promise<string>
    delete(filePath: string): Promise<void>
    size(filePath: string): Promise<number>
    exists(filePath: string): Promise<boolean>
}
