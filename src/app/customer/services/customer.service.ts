import {Injectable} from "@nestjs/common";
import {CreateCustomerDto} from "../dtos/create-customer.dto";
import {ValidationContract} from "fluent-validator-typescript";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import { RegisterNewCustomerCommand } from "src/domain/customer/commands/register-new-customer.command";
import {CustomerListDto} from "../dtos/customer-list.dto";
import { GetAllCustomersQuery } from "src/domain/customer/queries/get-all-customers.query";

export interface ICustomerService {
    createCustomer(dto: CreateCustomerDto): Promise<ValidationContract>;
    getAllCustomers(): Promise<CustomerListDto[]>
}

@Injectable()
export class CustomerService implements ICustomerService{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus){}
    
    async createCustomer(dto: CreateCustomerDto): Promise<ValidationContract> {
        return await this.commandBus.execute(new RegisterNewCustomerCommand(dto.name, dto.email, dto.birthDate));
    }

    async getAllCustomers(): Promise<CustomerListDto[]> {
        const customers = await this.queryBus.execute(new GetAllCustomersQuery());
        
        const customerListDto: CustomerListDto[] = [];
        customers.forEach(c => customerListDto.push(new CustomerListDto(c.id, c.name, c.email)))
        
        return Promise.resolve(customerListDto);
    }
    
}