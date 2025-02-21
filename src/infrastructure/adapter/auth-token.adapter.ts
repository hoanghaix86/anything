import { Injectable } from '@nestjs/common'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import { createId, isCuid } from '@paralleldrive/cuid2'

@Injectable()
export class AuthTokenAdapter implements IAuthTokenPort {
    generate(): string {
        return createId()
    }

    verify(token: string): boolean {
        return isCuid(token)
    }
}
