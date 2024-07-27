import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        credentials: true,
        origin: '*'
    })

    const config = new DocumentBuilder().addBearerAuth().setTitle('Вебпортал api').build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)

    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(5000)
}
bootstrap()
