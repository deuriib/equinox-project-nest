import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllCustomersQuery} from "../get-all-customers.query";
import {Customer} from "../../models/customer.model";
import {ICustomerRepository} from "../../../../infra/data/repositories/customer.repository";


@QueryHandler(GetAllCustomersQuery)
export class CustomerQueryHandler implements IQueryHandler<GetAllCustomersQuery, Customer[]> {
    constructor(private readonly customerRepository: ICustomerRepository) {
    }
    
    async execute(query: GetAllCustomersQuery): Promise<Customer[]> {
        return await this.customerRepository.getAll();
    }
    
}