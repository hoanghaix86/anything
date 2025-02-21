export const IPasswordHasherPort = Symbol('IPasswordHasherPort')

export interface IPasswordHasherPort {
    hash(password: string): Promise<string>
    compare(password: string, hashedPassword: string): Promise<boolean>
}
