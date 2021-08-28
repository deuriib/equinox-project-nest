import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {HttpExceptionFilter} from "./app/common/filters/http-exception-filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET','POST','PUT','PATCH','DELETE', 'OPTIONS'],
        allowedHeaders: ['Accept', 'Content-Type', 'api-version', 'Authorization'],
        exposedHeaders: ['api-version']
    });
    app.setGlobalPrefix('api')
    app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'api-version',
    });
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));
    await app.listen(3000);
    
    return app;
}

bootstrap().then(async (app) => console.info(`Running app in ${await app.getUrl() }`));
