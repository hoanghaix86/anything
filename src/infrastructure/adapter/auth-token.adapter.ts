import { Injectable } from '@nestjs/common'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import { createId, isCuid } from '@paralleldrive/cuid2'

@Injectable()
export class AuthTokenAdapter implements IAuthTokenPort {
    generate(): string {
        return `tk_${createId()}`
    }

    verify(token: string): boolean {
        if (!token.startsWith('tk_')) return false
        token = token.slice(3)
        return isCuid(token)
    }
}
