import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IAuthTokenPort } from 'src/domain/port/auth-token.port'
import { RequestAuth } from '../shared/request'
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator'

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
        const request = context.switchToHttp().getRequest<RequestAuth>()
        const token = this.extractTokenFromHeader(request)
        if (!token) throw new UnauthorizedException()

        if (this.authToken.verify(token)) {
            request.auth = this.authToken.decode(token)
            return Promise.resolve(true)
        }
        throw new UnauthorizedException()
    }

    private extractTokenFromHeader(request: RequestAuth): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
