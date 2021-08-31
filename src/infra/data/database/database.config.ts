import {SequelizeModuleOptions} from "@nestjs/sequelize";

export const DB_CONFIG: SequelizeModuleOptions = {
    dialect: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'NestUsr',
    password: '123456',
    database: 'EquinoxDevNest',
    autoLoadModels: true,
    synchronize: true,
    logging: false
}