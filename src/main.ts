import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.setGlobalPrefix('api')
    await app.listen(3000)
}

bootstrap().catch((err) => {
    console.error(`Application bootstrap failed: ${err}`)
    process.exit(1)
})
