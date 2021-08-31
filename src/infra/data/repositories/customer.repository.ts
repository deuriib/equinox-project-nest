import {Injectable} from "@nestjs/common";
import {Customer} from "../../../domain/customer/models/customer.model";
import {InjectModel} from "@nestjs/sequelize";
import {CustomerEntity} from "../entities/customer.entity";
import {CustomerDomainService} from "../../../domain/customer/services/customer-domain.service";

@Injectable()
export abstract class ICustomerRepository {
    abstract getAll(): Promise<Customer[]>;
    abstract createCustomer(customer: Customer): Promise<boolean>;
    abstract findOneByEmail(email: string): Promise<Customer>;
}

@Injectable()
export class CustomerRepository implements ICustomerRepository {
    constructor(
        @InjectModel(CustomerEntity) private customerModel: typeof CustomerEntity
    ) {
    }

    async getAll(): Promise<Customer[]> {
        const entities = await this.customerModel.findAll();
        const customers: Customer[] = [];
        
        entities.forEach((entity) => {
            customers.push(CustomerDomainService.createNewCustomer(entity.id, entity.name, entity.email, entity.birthDate))
        });
        
        return customers;
    }
    
    async createCustomer(customer: Customer): Promise<boolean> {
        const result = await this.customerModel.create({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            birthDate: customer.birthDate,
        });

        return !!result;
    }

    async findOneByEmail(email: string): Promise<Customer> {
        const entity = await this.customerModel.findOne({where: {email: email}});
        if (entity) {
            return CustomerDomainService.createNewCustomer(entity.id, entity.name, entity.email, entity.birthDate);
        }

        return null;
    }
    
}