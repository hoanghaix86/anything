export const IAuthTokenPort = Symbol('IAuthTokenPort')

export interface IAuthTokenPort {
    generate(): string
    verify(token: string): boolean
}
