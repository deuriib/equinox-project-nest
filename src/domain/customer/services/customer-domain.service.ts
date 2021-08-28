import {Customer} from "../models/customer.model";
import {CustomerRegisteredEvent} from "../events/customer-registered.event";
import {Guid} from "guid-typescript";

export class CustomerDomainService {
    static createNewCustomer(name: string, email: string, birthDate: Date): Customer {
        const customer = new Customer(Guid.create(), name, email, birthDate);
        customer.apply(new CustomerRegisteredEvent(customer.id, customer.name, customer.email, customer.birthDate));
        return customer;
    }
}