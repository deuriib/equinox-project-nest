import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {CustomerRepository, ICustomerRepository} from "./data/repositories/customer.repository";
import {CustomerEntity} from "./data/entities/customer.entity";

@Module({
    imports: [SequelizeModule.forFeature([CustomerEntity]),],
    providers: [
        {
            provide: ICustomerRepository,
            useClass: CustomerRepository
        },
    ],
    exports: [SequelizeModule, ICustomerRepository],
})
export class InfraModule {
}