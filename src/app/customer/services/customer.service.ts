import {Injectable} from "@nestjs/common";
import {CreateCustomerDto} from "../dtos/create-customer.dto";
import {ValidationContract} from "fluent-validator-typescript";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {RegisterNewCustomerCommand} from "src/domain/customer/commands/register-new-customer.command";
import {CustomerListDto} from "../dtos/customer-list.dto";
import {GetAllCustomersQuery} from "src/domain/customer/queries/get-all-customers.query";
import {InjectMapper} from "nestjsx-automapper";
import {AutoMapper} from "@nartc/automapper";
import {Customer} from "../../../domain/customer/models/customer.model";

export interface ICustomerService {
    createCustomer(dto: CreateCustomerDto): Promise<ValidationContract>;

    getAllCustomers(): Promise<CustomerListDto[]>
}

@Injectable()
export class CustomerService implements ICustomerService {
    constructor(private readonly commandBus: CommandBus,
                private readonly queryBus: QueryBus,
                @InjectMapper() private readonly mapper: AutoMapper
    ) {
    }

    async createCustomer(dto: CreateCustomerDto): Promise<ValidationContract> {
        return await this.commandBus.execute(new RegisterNewCustomerCommand(dto.name, dto.email, dto.birthDate));
    }

    async getAllCustomers(): Promise<CustomerListDto[]> {
        const customers = await this.queryBus.execute(new GetAllCustomersQuery());
        const customerListDto = this.mapper.mapArray(customers,CustomerListDto, Customer);

        return Promise.resolve(customerListDto);
    }

}