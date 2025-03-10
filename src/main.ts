import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import compression from 'compression'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.use(compression())
    app.enableCors({
        origin: ['http://localhost:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: false,
    })
    app.setGlobalPrefix('api')
    await app.listen(3000)
}

bootstrap().catch((err) => {
    console.error(`Application bootstrap failed: ${err}`)
    process.exit(1)
})
