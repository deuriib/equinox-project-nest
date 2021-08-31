import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {CustomerRegisteredEvent} from "../customer-registered.event";
import {ICustomerRepository} from "../../../../infra/data/repositories/customer.repository";

@EventsHandler(CustomerRegisteredEvent)
export class CustomerEventHandler implements IEventHandler<CustomerRegisteredEvent> {
    
    handle(event: CustomerRegisteredEvent): any {
        console.info('CustomerEventHandler::event',event);
    }
}