import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "../get-all-customers.query";
import {Customer} from "../../models/customer.model";


@QueryHandler(GetAllCustomersQuery)
export class CustomerQueryHandler implements IQueryHandler<GetAllCustomersQuery, Customer[]> {
    //TODO: import customer repository
    constructor(){}
    
    execute(query: GetAllCustomersQuery): Promise<Customer[]> {
        //TODO: return a list of customers from customer repository
        const customers: Customer[] = [];
        return Promise.resolve(customers);
    }
    
}