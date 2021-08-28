import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "../get-all-customers.query";
import {Customer} from "../../models/customer.model";
import {Guid} from "guid-typescript";
import {CustomerDomainService} from "../../services/customer-domain.service";


@QueryHandler(GetAllCustomersQuery)
export class CustomerQueryHandler implements IQueryHandler<GetAllCustomersQuery, Customer[]> {
    //TODO: import customer repository
    constructor(){}
    
    execute(query: GetAllCustomersQuery): Promise<Customer[]> {
        //TODO: return a list of customers from customer repository
        const customer = CustomerDomainService.createNewCustomer(
            'Deuri Vasquez', 'deuriib@gmail.com', new Date('1993-08-26')
        );

        const customers: Customer[] = [customer];
        return Promise.resolve(customers);
    }
    
}