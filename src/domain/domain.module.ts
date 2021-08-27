import {Module} from "@nestjs/common";

import {CustomerCommandHandler} from "./customer/commands/handlers/customer-command.handler";
import {CustomerEventHandler} from "./customer/events/handlers/customer-event.handler";
import {CqrsModule} from "@nestjs/cqrs";

export const CommandHandlers = [CustomerCommandHandler];
export const EventHandlers =  [CustomerEventHandler];

@Module({
    imports:[CqrsModule],
    providers:[
        ...CommandHandlers,
        ...EventHandlers,
    ],
    exports: [CqrsModule],
})
export class DomainModule {
        
}