import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth.guard'
import { Provider } from '@nestjs/common'

export const guards: Provider[] = [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
]
