import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, ValidationPipe, VersioningType} from "@nestjs/common";
import {HttpExceptionFilter} from "./app/common/filters/http-exception-filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET','POST','PUT','PATCH','DELETE', 'OPTIONS'],
        allowedHeaders: ['Accept', 'Content-Type', 'api-version', 'Authorization'],
        exposedHeaders: ['api-version']
    });
    app.setGlobalPrefix('api', {
        exclude: ['/'],
    })
    app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'api-version',
    });
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    await ConfigSwagger(app);
    await app.listen(3000);
    
    return app;
}

async function ConfigSwagger(app: INestApplication): Promise<any> {
    const config = new DocumentBuilder()
        .setVersion('1.0')
        .setTitle('Equinox Project NestJs')
        .setDescription('Equinox API Swagger surface')
        .setContact('Deuri Vasquez','https://github.com/deuriib/equinox-project-nest','deuriib@gmail.com')
        .setLicense('MIT','https://github.com/deuriib/EquinoxProject/blob/master/LICENSE')
        .setBasePath('/api')
        .addApiKey({
            type: 'apiKey',
            description: 'Input the JWT like: Bearer {your token}',
            name: 'Authorization',
            scheme: 'Bearer',
            bearerFormat: 'JWT',
            in: 'header',
        }, 'Bearer')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        }
    });
}

bootstrap().then(async (app) => console.info(`Running app in ${await app.getUrl() }`));
