import { AuthDto } from 'src/lib/dtos'

export const IAuthTokenPort = Symbol('IAuthTokenPort')

export interface IAuthTokenPort {
    generate(payload: AuthDto): string
    verify(token: string): boolean
    decode(token: string): AuthDto
}
