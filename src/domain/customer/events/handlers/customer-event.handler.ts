import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {CustomerRegisteredEvent} from "../customer-registered.event";

@EventsHandler(CustomerRegisteredEvent)
export class CustomerEventHandler implements IEventHandler<CustomerRegisteredEvent> {
    handle(event: CustomerRegisteredEvent): any {
        console.info(event.constructor.name,event);
    }
}