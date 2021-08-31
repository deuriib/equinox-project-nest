import {Global, Module} from "@nestjs/common";

import {CustomerCommandHandler} from "./customer/commands/handlers/customer-command.handler";
import {CustomerEventHandler} from "./customer/events/handlers/customer-event.handler";
import {CqrsModule} from "@nestjs/cqrs";
import {CustomerQueryHandler} from "./customer/queries/handlers/customer-query.handler";
import {InfraModule} from "src/infra/infra.module";

const CommandHandlers = [CustomerCommandHandler];
const EventHandlers = [CustomerEventHandler];
const QueryHandlers = [CustomerQueryHandler];

@Module({
    imports: [CqrsModule, InfraModule],
    providers: [
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
    exports: [CqrsModule, InfraModule],
})
export class DomainModule {

}