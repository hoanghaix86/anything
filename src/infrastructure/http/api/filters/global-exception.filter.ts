import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name)

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost

        const ctx = host.switchToHttp()

        // HttpException
        if (exception instanceof HttpException) {
            const statusCode = exception.getStatus()
            const message = exception.message
            const body = {
                statusCode,
                message: message,
            }
            return httpAdapter.reply(ctx.getResponse(), body, statusCode)
        }

        // Error
        if (exception instanceof Error) {
            const statusCode = HttpStatus.BAD_REQUEST
            const message = exception.message
            const body = { message }
            return httpAdapter.reply(ctx.getResponse(), body, statusCode)
        }

        return httpAdapter.reply(ctx.getResponse(), {}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
