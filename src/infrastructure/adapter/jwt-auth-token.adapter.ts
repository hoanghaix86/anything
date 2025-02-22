import { Injectable } from '@nestjs/common'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import * as jwt from 'jsonwebtoken'
import { AuthDto } from 'src/lib/dtos'

@Injectable()
export class JwtAuthTokenAdapter implements IAuthTokenPort {
    generate(payload: AuthDto): string {
        return jwt.sign(payload, 'huhahuha', {
            algorithm: 'HS256',
            expiresIn: '30d',
        })
    }

    verify(token: string): boolean {
        try {
            jwt.verify(token, 'huhahuha')
            return true
        } catch {
            return false
        }
    }

    decode(token: string): AuthDto {
        return jwt.decode(token) as AuthDto
    }
}
