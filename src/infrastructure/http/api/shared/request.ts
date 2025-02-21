import { AuthDto } from '../dtos/auth.dto'

export interface RequestAuth extends Request {
    auth: AuthDto
}
