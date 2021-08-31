import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ApplicationModule} from './app/application.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {DB_CONFIG} from "./infra/data/database/database.config";

@Module({
    imports: [
        SequelizeModule.forRoot(DB_CONFIG),
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
