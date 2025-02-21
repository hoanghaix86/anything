import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestAuth } from '../shared/request'

export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: RequestAuth = ctx.switchToHttp().getRequest()
    if (!request.auth) return undefined
    return request.auth
})
