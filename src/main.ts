import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {HttpExceptionFilter} from "./app/common/filters/http-exception-filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api', {
        exclude: ['/']
    })
    app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'api-version',
    });
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));
    await app.listen(3000);
}

bootstrap().then(() => console.info(''));
