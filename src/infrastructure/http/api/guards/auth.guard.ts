import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(IAuthTokenPort) private authToken: IAuthTokenPort,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // allow public route
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) return true

        // token
        const request: Request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) throw new UnauthorizedException()

        try {
            this.authToken.verify(token)
        } catch {
            throw new UnauthorizedException()
        }
        return Promise.resolve(true)
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
