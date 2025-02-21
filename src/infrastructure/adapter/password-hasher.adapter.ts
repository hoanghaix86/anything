import * as bcrypt from 'bcrypt'
import { IPasswordHasherPort } from '../../domain/port/password-hasher.port'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PasswordHasherAdapter implements IPasswordHasherPort {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}
