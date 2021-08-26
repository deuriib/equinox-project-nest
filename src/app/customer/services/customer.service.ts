import {Injectable} from "@nestjs/common";
import {CreateCustomerDto} from "../dtos/create-customer.dto";
import {ValidationContract} from "fluent-validator-typescript";
import {CommandBus} from "@nestjs/cqrs";
import { RegisterNewCustomerCommand } from "src/domain/customer/commands/register-new-customer.command";

export interface ICustomerService {
    createCustomer(dto: CreateCustomerDto): Promise<ValidationContract>;
}

@Injectable()
export class CustomerService implements ICustomerService{
    constructor(private commandBus: CommandBus){}
    
    createCustomer(dto: CreateCustomerDto): Promise<ValidationContract> {
        return this.commandBus.execute(new RegisterNewCustomerCommand(dto.name, dto.email, dto.birthDate));
    }
    
}