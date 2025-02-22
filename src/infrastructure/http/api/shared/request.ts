import { Request } from 'express'
import { AuthDto } from 'src/lib/dtos'

export interface RequestAuth extends Request {
    auth: AuthDto
}
